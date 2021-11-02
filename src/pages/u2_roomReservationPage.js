import React from 'react';
import { Link } from 'react-router-dom';
import NavBarUser from '../components/u_navBar';
import SelectedRoomTable from '../components/u2_selectedRoomTable';
import RoomReservationTable from '../components/u2_roomReservationTable';
import AddParticipant from '../components/u2_addParticipant';
import '../assets/styles/u2_roomReservationPage.css';

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
            <p className="rrp_titleTextStyle">
              <Link
                to="/room-reservation"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                회의실 예약
              </Link>
            </p>
          </div>
          <div className="srTable">
            <SelectedRoomTable />
            <RoomReservationTable />
          </div>
          <p className="rrp_centerTextStyle">회의 참석자를 입력하세요.</p>
          <div>
            <AddParticipant />
          </div>
        </div>
      </div>
    );
  }
}

export default RoomReservationPage;
