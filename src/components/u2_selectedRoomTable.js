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
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/rooms/${roomID}`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gOyngOybkCIsInJvbGUiOjAsImlhdCI6MTYzNjQ3MTQ2MywiZXhwIjoxNjM2NTU3ODYzfQ.n9OTcUPdHgdJ47vt2_jIAVmGZ8Rk5ndLb2TCLuHzkzI',
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

  console.log(data);
  return (
    <div>
      <Table striped hover className="selectedTable">
        <thead className="sHeader">
          <tr>
            <th>회의실명</th>
            <th>예약 가능 일</th>
            <th>사용 가능 인원</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.name}</td>
            <td>
              {getYear(today)}.{getMonth(today) + 1}.{getDate(today)}-
              {getYear(today)}.{getMonth(today) + 1}.{getDate(today) + 6}
            </td>
            <td>{data.maxUser}명</td>
          </tr>
        </tbody>
      </Table>
      <Calendar roomMAXUSER={data.maxUser} roomID={roomID} />
    </div>
  );
};

export default SelectedRoomTable;
