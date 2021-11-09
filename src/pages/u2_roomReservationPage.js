import React from 'react';
import { Link } from 'react-router-dom';
import NavBarUser from '../components/u_navBar';
import SelectedRoomTable from '../components/u2_selectedRoomTable';
import RoomReservationTable from '../components/u2_roomReservationTable';
import AddParticipant from '../components/u2_addParticipant';
import '../assets/styles/u2_roomReservationPage.css';

//회의실 예약 페이지
const RoomReservationPage = props => {
  const roomId = props.match.params.idx;
  console.log(roomId);
  return (
    <div className="roomReservationPage">
      <div>
        <NavBarUser />
      </div>

      <div className="reservationForm">
        <div className="reservationHeader">
          <div className="rrp_titleTextStyle">
            <Link
              to="/room-reservation"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              회의실 예약
            </Link>
          </div>
        </div>
        <div className="srTable">
          <SelectedRoomTable roomID={roomId} />
          {/* <RoomReservationTable /> */}
        </div>
        <div>{/* <AddParticipant /> */}</div>
      </div>
    </div>
  );
};

export default RoomReservationPage;
