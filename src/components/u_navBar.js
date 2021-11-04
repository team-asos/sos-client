import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from './u_appBar';
import TimeBar from './2_timeBar';
import '../assets/styles/a2_navBox.css';
const logout = () => {
  window.location.href = '/';
};
class NavBar extends React.Component {
  render() {
    return (
      <div className="navBox">
        <Link to="seat-reservation">
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

export default NavBar;
