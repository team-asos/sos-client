import React from 'react';
import * as AiIcon from 'react-icons/ai';
import '../../assets/styles/IconStyle.css';

class NotificationIcon extends React.Component {
  render() {
    return (
      <div className="icon-box">
        <AiIcon.AiFillMessage
          className="icon"
          style={{ filter: 'drop-shadow(5px 5px 10px rgb(200,200,200))' }}
          size={27}
        />
      </div>
    );
  }
}

export default NotificationIcon;
