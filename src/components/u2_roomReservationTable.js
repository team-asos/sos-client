import React from 'react';
import { Table } from 'react-bootstrap';
import Calendar from './u2_calendar';
import 'react-datepicker/dist/react-datepicker.css'; // css import
import '../assets/styles/u2_roomReservationTable.css';

//회의실 예약 테이블(내 정보, 이용시간 선택하기)
class RoomReservationTable extends React.Component {
  render() {
    return (
      <div>
        <Table striped hover className="reservationTable">
          <thead className="rHeader">
            <tr>
              <th>이름</th>
              <th>전화번호</th>
              <th>이용시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>홍길동</td>
              <td>010-1234-5678</td>
              <td>
                <Calendar />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default RoomReservationTable;
