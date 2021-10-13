import React from 'react';
import { Link } from 'react-router-dom';

import AccountIcon from './icons/a_accountIcon';
import MemberIcon from './icons/a_memberIcon';
import NotificationIcon from './icons/a_notificationIcon';
import SeatIcon from './icons/a_seatIcon';
import SettingIcon from './icons/a_settingIcon';

class AppBar extends React.Component {
  render() {
    return (
      <div>
        <AccountIcon />
        <MemberIcon />
        <SeatIcon />
        <Link to="/notification" style={{ color: 'black' }}>
          <NotificationIcon />
        </Link>
        <SettingIcon />
      </div>
    );
  }
}

export default AppBar;
