import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import * as moment from 'moment';
import { useMediaQuery } from 'react-responsive';

import '../assets/styles/u4_reservationInfo.css';

const RoomReservationInfo = props => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

  //예약내역 불러오기
  const [reservation, setReservation] = useState([]);

  const res = async () => {
    const id = Number(props.user.id);
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/search?userId=${id}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        setReservation(json);
      });
  };

  const deleteRoomReservationClick = reservationId => {
    console.log(reservationId);
    const deleteRoomReservation = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/${reservationId}`,
        {
          headers: {
            'Content-type': 'application/json',
          },
          method: 'DELETE',
        },
      );
      if (response.status === 200) {
        alert('예약 취소가 완료되었습니다.');
        window.location.href = '/user-mypage';
      } else {
        const json = await response.json();
        alert(json.message);
      }
    };
    deleteRoomReservation();
  };

  //예외처리
  useEffect(() => {
    if (props.user.id !== 'undefined') res();
  }, [props.user.id]);
  const sortedReservation = reservation.sort((a, b) =>
    a.startTime.split('-').join().localeCompare(b.startTime.split('-').join()),
  );
  return (
    <div className={isPc ? 'roomReservationInfo' : 'm_roomReservationInfo'}>
      <div>
        <div className="reservationInfo-header">
          <p
            style={
              isPc
                ? {
                    fontWeight: 'bold',
                    fontSize: '1.4em',
                    marginLeft: '3%',
                    marginTop: '1%',
                    width: '27%',
                  }
                : {
                    fontWeight: 'bold',
                    fontSize: '1em',
                    marginLeft: '3%',
                    marginTop: '1%',
                    width: '40%',
                  }
            }
          >
            회의실 예약 내역
          </p>
        </div>
        <div style={{ height: '35vh' }}>
          <MDBTable
            hover
            style={
              isPc
                ? { width: '90%', marginLeft: '5%' }
                : { width: '90%', marginLeft: '5%', fontSize: '0.8em' }
            }
            scrollY={true}
            maxHeight={isPc ? '40vh' : '53vh'}
          >
            <MDBTableHead style={{ fontSize: '0.9em' }}>
              <tr>
                <th style={isPc ? { width: '20%' } : { width: '20%' }}>
                  {isPc ? '이용 날짜' : '날짜'}
                </th>
                <th style={isPc ? { width: '20%' } : { width: '20%' }}>
                  {isPc ? '예약 정보' : '정보'}
                </th>
                <th style={isPc ? { width: '15%' } : { width: '10%' }}>
                  {isPc ? '시작 시간' : '시작'}
                </th>
                <th style={isPc ? { width: '15%' } : { width: '10%' }}>
                  {isPc ? '종료 시간' : '종료'}
                </th>
                <th style={isPc ? { width: '20%' } : { width: '20%' }}>
                  {isPc ? '예약 상태' : '상태'}
                </th>
                <th style={isPc ? { width: '10%' } : { width: '20%' }}></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody style={{ height: '100%' }}>
              {reservation.length !== 0 &&
                sortedReservation
                  .slice(0)
                  .reverse()
                  .map((item, idx) =>
                    item.room !== null ? (
                      <tr key={idx}>
                        <td>{moment(item.startTime).format('YYYY-MM-DD')}</td>
                        <td>
                          {item.room.floor.name} {item.room.name}
                        </td>
                        <td>{moment(item.startTime).format('HH:mm')}</td>

                        <td>{moment(item.endTime).format('HH:mm')}</td>
                        <td>
                          {item.status === 0
                            ? '예약 완료'
                            : item.status === 1
                            ? '사용 중'
                            : '사용 완료'}
                        </td>
                        <td>
                          {item.status === 0 ? (
                            <button
                              className="roomReservationDeleteBtn"
                              onClick={() =>
                                deleteRoomReservationClick(item.id)
                              }
                            >
                              취소
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ) : null,
                  )}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </div>
  );
};
export default RoomReservationInfo;
