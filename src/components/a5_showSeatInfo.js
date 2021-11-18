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
              border: '1px solid #c00000',
              borderRadius: '2px',
              color: '#c00000',
              backgroundColor: 'white',
            }}
          >
            수정하기
          </button>
          <button
            style={{
              border: '1px solid #c00000',
              borderRadius: '2px',
              color: '#c00000',
              backgroundColor: 'white',
            }}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShowSeatInfo;
