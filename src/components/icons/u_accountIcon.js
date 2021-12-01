import React from 'react';
import * as HiIcon from 'react-icons/hi';
import '../../assets/styles/IconStyle.css';

const AccountIcon = () => {
  return (
    <div className="icon-box">
      <HiIcon.HiUserCircle className="icon" size={27} />
    </div>
  );
};

export default AccountIcon;
