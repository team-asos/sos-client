import { getYear } from 'date-fns';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Table } from 'react-bootstrap';
import Calendar from './u2_calendar';
import { useMediaQuery } from 'react-responsive';

import '../assets/styles/u2_selectedRoomTable.css';
//회의실 예약 페이지-> 선택된 회의실 설명 테이블(room-check에서 정보 받아오기)
const SelectedRoomTable = props => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const [cookie] = useCookies(['access_token']);
  const today = new Date();
  const roomID = props.roomID; //선택한 회의실 id
  const [data, setData] = useState([]); //db 회의실 정보
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/rooms/${roomID}`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
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
      <MDBTable hover className={isPc ? 'infoTable' : 'mobileInfoTable'}>
        <MDBTableHead className="rHeader">
          <tr>
            <th>회의실명</th>
            <th>예약 가능 일</th>
            <th>사용 가능 인원</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>{data.name}</td>
            <td>
              {getYear(today)}.{getMonth(today) + 1}.{getDate(today)}-
              {getYear(today)}.{getMonth(today) + 1}.{getDate(today) + 6}
            </td>
            <td>{data.maxUser}명</td>
          </tr>
        </MDBTableBody>
      </MDBTable>
      <Calendar roomMAXUSER={data.maxUser} roomID={roomID} />
    </div>
  );
};

export default SelectedRoomTable;
