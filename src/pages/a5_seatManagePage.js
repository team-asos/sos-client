import React from 'react';

import '../assets/styles/a5_seatManagePage.css';

import NavBox from '../components/a2_navBox';
import { Arrangement } from '../components/Arrangement';

const seatManagePage = () => {
  return (
    <div className="seatManagePage">
      <div>
        <NavBox />
      </div>
      <div className="seatManagePageRight">
        <Arrangement />
      </div>
    </div>
  );
};

export default seatManagePage;
