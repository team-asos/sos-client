import React from 'react';

import AccountIcon from './icons/a_accountIcon';
import SeatReservationIcon from './icons/u_seatReservationIcon';
import RoomReservationIcon from './icons/u_roomReservationIcon';
import NotificationIcon from './icons/a_notificationIcon';
import SettingIcon from './icons/a_settingIcon';

class AppBox extends React.Component {
  render() {
    return (
      <div>
        <AccountIcon />
        <SeatReservationIcon />
        <RoomReservationIcon />
        <NotificationIcon />
        <SettingIcon />
      </div>
    );
  }
}

export default AppBox;
