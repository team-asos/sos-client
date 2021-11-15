import React from 'react';

import * as AiIcon from 'react-icons/ai';

import '../../assets/styles/IconStyle.css';

class NotificationIcon extends React.Component {
  render() {
    return (
      <div className="icon-box">
        <AiIcon.AiFillMessage className="icon" size={35} />
        <p className="text">알림</p>
      </div>
    );
  }
}

export default NotificationIcon;
