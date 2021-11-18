import React from 'react';
import '../assets/styles/a5_showTab.css';

const ShowSeatInfo = props => {
  return (
    <div style={{ marginTop: '5%', marginLeft: '5%' }}>
      <div>
        <p>좌석 정보</p>
        <table className="showTable">
          <tr>
            <th>좌석 번호</th>
            <td>{props.clickedSeat.name}</td>
          </tr>
          <tr>
            <th>좌석 위치</th>
            <td>
              ({props.clickedSeat.x + 1}, {props.clickedSeat.y + 1})
            </td>
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
