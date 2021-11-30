import React from 'react';
import * as MdIcon from 'react-icons/md';
import '../../assets/styles/IconStyle.css';

class SeatReservationIcon extends React.Component {
  render() {
    return (
      <div className="icon-box">
        <MdIcon.MdEventSeat className="icon" size={35} />
        <p className="text"> 좌석</p>
      </div>
    );
  }
}

export default SeatReservationIcon;
