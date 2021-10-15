import React from 'react';
import NavBarUser from '../components/u_navBar';
import { Table, Dropdown } from 'react-bootstrap';
import '../assets/styles/u2_roomReservationPage.css';
import SelectedRoomTable from '../components/u2_selectedRoomTable';
import RoomReservationTable from '../components/u2_roomReservationTable';

//회의실 예약 페이지
class RoomReservationPage extends React.Component {
  render() {
    return (
      <div className="roomReservationPage">
        <div>
          <NavBarUser />
        </div>

        <div className="reservationForm">
          <div className="reservationHeader">
            <br></br>
            <p className="rrp_titleTextStyle">회의실 예약</p>
          </div>
          <div className="srTable">
            <SelectedRoomTable />
            <RoomReservationTable />
          </div>
          <p className="rrp_centerTextStyle">회의 참석자를 입력하세요.</p>
        </div>
      </div>
    );
  }
}

export default RoomReservationPage;
