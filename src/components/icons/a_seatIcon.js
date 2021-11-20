import React from 'react';

import * as TiIcon from 'react-icons/ti';

import '../../assets/styles/IconStyle.css';

class SeatIcon extends React.Component {
  render() {
    return (
      <div className="icon-box">
        <TiIcon.TiThSmall className="icon" size={35} />
        <p className="text">좌석 관리</p>
      </div>
    );
  }
}

export default SeatIcon;
