import React from 'react';

import '../assets/styles/a5_seatManagePage.css';

import NavBox from '../components/a2_navBox';
import SeatManageBox from '../components/a5_seatManageBox';

export default class seatManagePage extends React.Component {
  render() {
    return (
      <div className="seatManagePage">
        <div>
          <NavBox />
        </div>
        <div className="seatManagePageRight">
          <SeatManageBox />
        </div>
      </div>
    );
  }
}
