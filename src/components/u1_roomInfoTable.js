import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RoomData from '../assets/data/roomList';
import '../assets/styles/u1_roomInfoTable.css';

//전체 회의실 리스트 조회
class RoomInfoTable extends React.Component {
  render() {
    return (
      <div>
        <Table className="infoTable">
          <thead className="rHeader">
            <tr>
              <th>회의실 명</th>
              <th>층</th>
              <th>예약 가능 일</th>
              <th>사용 가능 인원</th>
              <th></th>
            </tr>
          </thead>
          {RoomData.listData.map(item => (
            <tbody>
              <tr>
                <td>{item.name}</td>
                <td>{item.floor_id}층</td>
                <td>2021/10/01-2021/10/08</td>
                <td>{item.max_user}명</td>
                <td>
                  <Link to="/room-reservation">
                    <button className="roomReservationButton">예약하기</button>
                  </Link>
                  <button className="roomStatusButton">예약현황</button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    );
  }
}

export default RoomInfoTable;
