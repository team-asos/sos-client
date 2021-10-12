import React from 'react';
import AccountIcon from './icons/a_accountIcon';
import MemberIcon from './icons/a_memberIcon';
import NotificationIcon from './icons/a_notificationIcon';
import SeatIcon from './icons/a_seatIcon';
import SettingIcon from './icons/a_settingIcon';

class AppBox extends React.Component {
  render() {
    var HoverIconStyle = {};
    return (
      <div>
        <AccountIcon />
        <MemberIcon />
        <SeatIcon />
        <NotificationIcon />
        <SettingIcon />
      </div>
    );
  }
}

export default AppBox;
