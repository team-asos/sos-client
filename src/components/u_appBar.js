import React from 'react';

import AccountIcon from './icons/u_accountIcon';
import SeatReservationIcon from './icons/u_seatReservationIcon';
import RoomReservationIcon from './icons/u_roomReservationIcon';
import InquireIcon from './icons/u_inquireIcon';

class AppBox extends React.Component {
  render() {
    return (
      <div>
        <SeatReservationIcon />
        <RoomReservationIcon />
        <InquireIcon />
        <AccountIcon />
      </div>
    );
  }
}

export default AppBox;
