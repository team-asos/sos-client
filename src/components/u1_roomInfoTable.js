import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/styles/u1_roomInfoTable.css';
import { getMonth, getDate, getYear } from 'date-fns';
//전체 회의실 리스트 조회
const RoomInfoTable = () => {
  const [cookie] = useCookies(['access_token']);
  const [idx, setIdx] = useState();
  const [data, setData] = useState([]);

  const handleClick = e => {
    setIdx(e);
    const idx = e;
    window.location.href = `/room-reservation/${idx}`;
  };
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/rooms`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
          //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gOyngOybkCIsInJvbGUiOjAsImlhdCI6MTYzNjYzMjAyNywiZXhwIjoxNjM5MjI0MDI3fQ.z7hJl0nLbgWs2HCrzzhfLMhcxDG-a6eM30a3CiPS1tQ',
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setData(json);
        });
    };
    res();
  }, []);
  return (
    <div>
      <Table striped hover className="infoTable">
        <thead className="rHeader">
          <tr>
            <th>회의실 명</th>
            <th>층</th>
            <th>예약 가능 일</th>
            <th>사용 가능 인원</th>
            <th></th>
          </tr>
        </thead>
        {data.map((item, idx) => (
          <tbody>
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.floor.name}</td>
              <td>
                {getYear(new Date()) +
                  '-' +
                  (getMonth(new Date()) + 1) +
                  '-' +
                  getDate(new Date()) +
                  ' ~ ' +
                  getYear(new Date()) +
                  '-' +
                  (getMonth(new Date()) + 1) +
                  '-' +
                  (getDate(new Date()) + 6)}
              </td>
              <td>{item.maxUser}명</td>
              <td>
                <Link
                  to={{
                    pathname: '/room-reservation',
                  }}
                >
                  <button
                    className="roomReservationButton"
                    onClick={() => handleClick(item.id)}
                  >
                    예약하기
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default RoomInfoTable;
