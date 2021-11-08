import { getYear } from 'date-fns';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Calendar from './u2_calendar';
import '../assets/styles/u2_selectedRoomTable.css';
//회의실 예약 페이지-> 선택된 회의실 설명 테이블(room-check에서 정보 받아오기)
const SelectedRoomTable = props => {
  const today = new Date();
  const roomID = props.roomID; //선택한 회의실 id
  const [data, setData] = useState([]); //db 회의실 정보
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/rooms`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiLquYDsubTtgqQiLCJyb2xlIjowLCJpYXQiOjE2MzYyOTA0NDQsImV4cCI6MTYzNjM3Njg0NH0.t2s5c_QsXxFk9oeAYrj3MnqxsEKRrVj_mOkv0__9-YI',
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

  const roomName = () => {
    for (let i = 0; i < data.length; i++) {
      if (roomID == data[i].id) {
        console.log(data);
        return data[i].name;
      }
    }
  };
  const roomMaxUser = () => {
    for (let i = 0; i < data.length; i++) {
      if (roomID == data[i].id) return data[i].maxUser;
    }
  };
  return (
    <div>
      <Table className="selectedTable">
        <thead className="sHeader">
          <tr>
            <th>회의실명</th>
            <th>예약 가능 일</th>
            <th>사용 가능 인원</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{roomName()}</td>
            <td>
              {getYear(today)}.{getMonth(today) + 1}.{getDate(today)}-
              {getYear(today)}.{getMonth(today) + 1}.{getDate(today) + 6}
            </td>
            <td>{roomMaxUser()}명</td>
          </tr>
        </tbody>
      </Table>
      <Calendar roomMAXUSER={roomMaxUser()} />
    </div>
  );
};

export default SelectedRoomTable;
