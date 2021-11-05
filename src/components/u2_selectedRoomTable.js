import { getYear } from 'date-fns';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import React from 'react';
import { Table } from 'react-bootstrap';
import RoomData from '../assets/data/roomList';
import '../assets/styles/u2_selectedRoomTable.css';
import * as RoomInfo from './u1_roomInfoTable';
//회의실 예약 페이지-> 선택된 회의실 설명 테이블(room-check에서 정보 받아오기)
const today = new Date();
const SelectedRoomTable = props => {
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
            <td>회의실7</td>
            <td>
              {getYear(today)}.{getMonth(today) + 1}.{getDate(today)}-
              {getYear(today)}.{getMonth(today) + 1}.{getDate(today) + 6}
            </td>
            <td>4명</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default SelectedRoomTable;
