import React from 'react';

import '../assets/styles/a4_userManagePage.css';

import NavBox from '../components/a2_navBox';
import UserManageBox from '../components/a4_userManageBox';

function userManagePage({ match }) {
  return (
    <div className="userManagePage">
      <div>
        <NavBox />
      </div>
      <div className="userManagePageRight">
        <UserManageBox />
      </div>
    </div>
  );
}

export default userManagePage;
