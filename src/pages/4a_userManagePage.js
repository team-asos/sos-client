import React from 'react';

import '../assets/styles/4a_userManagePage.css';

import NavBox from '../components/2a_navBox';
import UserManageBox from '../components/4a_userManageBox';

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
