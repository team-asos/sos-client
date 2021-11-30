import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

import '../assets/styles/1_qrPage.css';

const QrPage = ({ match }) => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchReservation = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/${match.params.reservationId}`,
        { method: 'GET' },
      );
      setInfo(await result.json());
    };
    fetchReservation();
  }, []);

  return (
    <div>
      {info.length === 0 ? (
        <p>로딩실패</p>
      ) : (
        <div className="qrPage-container">
          <section className="section-1">
            {info.room.floor.name}
            <h1>{info.room.name}</h1>
          </section>
          <section className="section-2">
            <h1>{info.topic}</h1>
            <h3>
              {moment(info.startTime).format('HH:mm')}-
              {moment(info.endTime).format('HH:mm')}
            </h3>
          </section>
          <section className="section-3">
            <p style={{ color: 'gray' }}>대표예약자</p>
            <h2>{info.user.name}</h2>
            <h4>{info.user.tel}</h4>
          </section>
          <section className="section-4">
            <p style={{ color: 'gray', marginBottom: '3px' }}>참석자</p>
            <div className="section-4-grid">
              {info.participants.map(item => (
                <div key={item.user.id}>{item.user.name}</div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default QrPage;
