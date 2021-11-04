import React from 'react';
import '../assets/styles/a4_userDetailPage.css';

import NavBox from '../components/a2_navBox';
import UserDetailBox from '../components/a4_userDetailBox';

function userDetailPage({ props }) {
  return (
    <div className="userDetailPage">
      <div>
        <NavBox />
      </div>
      <div className="userDetailPageRight">
        <UserDetailBox />
      </div>
    </div>
  );
}

export default userDetailPage;
