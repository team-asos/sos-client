import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import * as ai from 'react-icons/ai';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import * as moment from 'moment';

import '../assets/styles/u4_reservationInfo.css';

const RoomReservationInfo = props => {
  //쿠키 생성
  const [cookie] = useCookies(['access_token']);

  //예약내역 불러오기
  const [reservation, setReservation] = useState([]);

  //예약내역 모달창
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  //예외처리
  useEffect(() => {
    if (props.user.id !== 'undefined') res();
  }, [props.user.id]);
  console.log(reservation);
  /* 예약 날짜 정렬 */
  const sortedReservation = reservation.sort((a, b) =>
    a.startTime.split('-').join().localeCompare(b.startTime.split('-').join()),
  );
  return (
    <div className="reservationInfo">
      <div>
        <div className="reservationInfo-header">
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '1.4em',
              marginLeft: '3%',
              marginTop: '1%',
              width: '24%',
            }}
          >
            회의실 예약 내역
          </p>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Tooltip
                id="tooltip-right"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  marginLeft: '1%',
                }}
              >
                이용내역 조회하기
              </Tooltip>
            }
          >
            <p>
              <ai.AiOutlineHistory
                size={25}
                className="reservation-history-icon"
                onClick={handleShow}
              />
            </p>
          </OverlayTrigger>
        </div>
        <div>
          <MDBTable
            hover
            style={{ width: '90%', marginLeft: '5%', height: '100%' }}
            scrollY="true"
          >
            <MDBTableHead style={{ fontSize: '0.9em' }}>
              <tr>
                <th style={{ width: '20%' }}>이용 날짜</th>
                <th style={{ width: '20%' }}>예약 정보</th>
                <th style={{ width: '20%' }}>시작 시간</th>
                <th style={{ width: '20%' }}>종료 시간</th>
                <th style={{ width: '20%' }}>예약 상태</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody style={{ height: '100%' }}>
              {reservation.length !== 0 &&
                sortedReservation
                  .slice(0)
                  .reverse()
                  .map(item =>
                    item.room !== null ? (
                      <tr>
                        <td>{moment(item.startTime).format('YYYY-MM-DD')}</td>
                        <td>
                          {item.room.floor.name} {item.room.name}
                        </td>
                        <td>{moment(item.startTime).format('HH:mm:ss')}</td>

                        <td>{moment(item.endTime).format('HH:mm:ss')}</td>
                        <td>
                          {item.status === 0
                            ? '예약 완료'
                            : item.status === 1
                            ? '사용 중'
                            : '사용 완료'}
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
