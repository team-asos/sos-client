import React, { Component } from 'react';
import NavBarUser from '../components/u_navBar';
import SelectedRoomTable from '../components/u2_selectedRoomTable';
import RoomReservationTable from '../components/u2_roomReservationTable';
import '../assets/styles/u2_roomReservationPage.css';
//회의실 예약 페이지
class RoomReservationPage extends Component {
  render() {
    return (
      <div>
        <NavBarUser />
        <div className="header1">
          <br></br>
          <p className="rrp_titleTextStyle">회의실 예약</p>
        </div>
        <div className="srTable">
          <SelectedRoomTable />
          <br></br>
          <RoomReservationTable />
          <br></br>
          <p className="rrp_centerTextStyle">회의 참석자를 입력하세요.</p>
        </div>
      </div>
    );
  }
}

export default RoomReservationPage;
