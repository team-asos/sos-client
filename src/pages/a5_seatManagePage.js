import React from 'react';

import '../assets/styles/a5_seatManagePage.css';

import NavBox from '../components/a2_navBox';
import SeatManageBox from '../components/a5_seatManageBox';

const SeatManagePage = () => {
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
};
export default SeatManagePage;
