import React from 'react';
import * as MdIcon from 'react-icons/md';
import '../../assets/styles/IconStyle.css';

const RoomIcon = () => {
  return (
    <div className="icon-box">
      <MdIcon.MdMeetingRoom className="icon" size={27} />
    </div>
  );
};

export default RoomIcon;
