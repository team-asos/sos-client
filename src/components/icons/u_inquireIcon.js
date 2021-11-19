import React from 'react';
import * as MdIcon from 'react-icons/md';
import '../../assets/styles/IconStyle.css';

class InquireIcon extends React.Component {
  render() {
    return (
      <div className="icon-box">
        <MdIcon.MdQuestionAnswer className="icon" size={35} />

        <p className="text"> 문의</p>
      </div>
    );
  }
}

export default InquireIcon;
