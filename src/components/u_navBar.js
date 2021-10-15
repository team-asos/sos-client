import React from 'react';

import AppBar from './u_appBar';
import TimeBar from './2_timeBar';
import '../assets/styles/a2_navBox.css';

class NavBar extends React.Component {
  render() {
    return (
      <div className="navBox">
        <div className="logoBar"></div>
        <div className="appBar">
          <AppBar />
        </div>
        <div className="dateBar">
          <TimeBar />
        </div>
      </div>
    );
  }
}

export default NavBar;
