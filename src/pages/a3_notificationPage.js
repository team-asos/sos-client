import React from 'react';

import '../assets/styles/a3_notificationPage.css';

import NavBox from '../components/a2_navBox';
import MessageBox from '../components/a3_messageBox';

const NotificationPage = () => {
  return (
    <div className="notificationPage">
      <div>
        <NavBox />
      </div>
      <div className="notificationPageRight">
        <MessageBox />
      </div>
    </div>
  );
};

export default NotificationPage;
