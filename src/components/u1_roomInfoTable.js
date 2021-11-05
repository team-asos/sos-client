import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RoomData from '../assets/data/roomList';
import '../assets/styles/u1_roomInfoTable.css';

//전체 회의실 리스트 조회
const RoomInfoTable = props => {
  const [idx, setIdx] = useState();
  const handleClick = e => {
    console.log(e);
    setIdx(e);
    return e;
  };
  // export function roomIdx(idx) {
  //   return idx;
  // }
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
        {RoomData.listData.map((item, idx) => (
          <tbody>
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.floor_id}층</td>
              <td>2021/10/01-2021/10/08</td>
              <td>{item.max_user}명</td>
              <td>
                <Link to="/room-reservation">
                  <button
                    className="roomReservationButton"
                    onClick={() => handleClick(idx)}
                  >
                    예약하기
                  </button>
                </Link>
                <button className="roomStatusButton">예약현황</button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default RoomInfoTable;
