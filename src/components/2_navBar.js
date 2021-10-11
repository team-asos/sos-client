import React from 'react';

import AppBar from './2_appBar';
import TimeBar from './2_timeBar';
import '../assets/styles/2_navBar.css'

class NavBar extends React.Component {
  render(){
    return (
      <div className="navBar">
        <div className="logoBar">
        </div>
        <div className="appBar">
          <AppBar/>
        </div>
        <div className="dateBar">
          <TimeBar/>
        </div>
      </div>
    );
  }
}

export default NavBar;
