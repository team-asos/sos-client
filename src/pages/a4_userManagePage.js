import React from 'react';

import '../assets/styles/a4_userManagePage.css';

import NavBox from '../components/a2_navBox';
import UserManageBox from '../components/a4_userManageBox';

class userManagePage extends React.Component {
  render() {
    return (
      <div className="notificationPage">
        <div>
          <NavBox />
        </div>
        <div>
          <UserManageBox />
        </div>
      </div>
    );
  }
}

export default userManagePage;
