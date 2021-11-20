import React from 'react';
import '../assets/styles/a5_showTab.css';

const ShowSeatInfo = props => {
  return (
    <div style={{ marginTop: '5%', marginLeft: '5%' }}>
      <div>
        <p>회의실 정보</p>
        <table className="showTable">
          <tr>
            <th>회의실 번호</th>
            <td>{props.clickedRoom.name}</td>
          </tr>
          <tr>
            <th>회의실 위치</th>
            <td>
              ({props.clickedRoom.y + 1}, {props.clickedRoom.x + 1})
            </td>
          </tr>
          <tr>
            <th>회의실 크기</th>
            <td>
              {props.clickedRoom.height}X{props.clickedRoom.width}
            </td>
          </tr>
          <tr>
            <th>회의실 최대 인원수</th>
            <td>{props.clickedRoom.maxUser}</td>
          </tr>
        </table>
        <div
          style={{ marginTop: '5%', textAlign: 'center', marginRight: '2%' }}
        >
          <button
            style={{
              marginRight: '2%',
              border: 'none',
              borderRadius: '2px',
              color: 'white',
              backgroundColor: '#c00000',
            }}
          >
            수정
          </button>
          <button
            style={{
              border: 'none',
              borderRadius: '2px',
              color: 'white',
              backgroundColor: '#c00000',
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShowSeatInfo;
