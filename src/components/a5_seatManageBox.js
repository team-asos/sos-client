import React from 'react';

import '../assets/styles/a5_seatManageBox.css';
import SeatBoard from './a5_seatBoard';

class seatManageBox extends React.Component {
  render() {
    return (
      <div className="seatManageBox">
        {/* 위, 텍스트 부분 */}
        <div className="seatManageUpperBox">
          <div className="seatManageUpperBoxChild">
            <p>좌석 관리</p>
          </div>
        </div>
        {/* 아래,  부분 */}
        <div className="seatManageBottomBox">
          <SeatBoard />
        </div>
      </div>
    );
  }
}

export default seatManageBox;
