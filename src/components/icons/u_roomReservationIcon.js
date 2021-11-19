import React from 'react';
import * as MdIcon from 'react-icons/md';
import '../../assets/styles/IconStyle.css';

class RoomIcon extends React.Component {
  render() {
    return (
      <div className="icon-box">
        <MdIcon.MdMeetingRoom className="icon" size={35} />
        <p className="text"> 회의실</p>
      </div>
    );
  }
}

export default RoomIcon;
