import React from 'react';
import { Table } from 'react-bootstrap';
import '../assets/styles/u2_selectedRoomTable.css';

//회의실 예약 페이지-> 선택된 회의실 설명 테이블(room-check에서 정보 받아오기)
class SelectedRoomTable extends React.Component {
  render() {
    return (
      <div>
        <Table className="selectedTable">
          <thead className="sHeader">
            <tr>
              <th>회의실 명</th>
              <th>예약 가능 일</th>
              <th>사용 가능 인원</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>회의실7</td>
              <td>2021/10/01~2021/10/08</td>
              <td>4명</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SelectedRoomTable;
