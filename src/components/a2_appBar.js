import React from 'react';
import { Link } from 'react-router-dom';

import AccountIcon from './icons/a_accountIcon';
import MemberIcon from './icons/a_memberIcon';
import NotificationIcon from './icons/a_notificationIcon';
import SeatIcon from './icons/a_seatIcon';

class AppBar extends React.Component {
  render() {
    return (
      <div>
        <AccountIcon />
        <Link to="/user-management" style={{ color: 'black' }}>
          <MemberIcon />
        </Link>
        <Link to="/seat-management" style={{ color: 'black' }}>
          <SeatIcon />
        </Link>
        <Link to="/notification" style={{ color: 'black' }}>
          <NotificationIcon />
        </Link>
      </div>
    );
  }
}

export default AppBar;
