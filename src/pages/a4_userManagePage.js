import React from 'react';

import NavBox from '../components/a2_navBox';
import UserManageBox from '../components/a4_userManageBox';

import '../assets/styles/a4_userManagePage.css';
const UserManagePage = () => {
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
};

export default UserManagePage;
