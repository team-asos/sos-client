import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from './a2_appBar';
import TimeBar from './2_timeBar';
import '../assets/styles/a2_navBox.css';

const logout = () => {
  window.location.href = '/';
};
class NavBox extends React.Component {
  render() {
    return (
      <div className="navBox">
        <Link to="/user-management">
          <div className="logoBar"></div>
        </Link>
        <div className="appBar">
          <AppBar />
        </div>
        <div className="logOutBar">
          <p className="logOutTextStyle" onClick={logout}>
            로그아웃
          </p>
        </div>
        <div className="dateBar">
          <TimeBar />
        </div>
      </div>
    );
  }
}

export default NavBox;
