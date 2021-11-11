import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBarUser from '../components/u_navBar';
import SelectedRoomTable from '../components/u2_selectedRoomTable';
import '../assets/styles/u2_roomReservationPage.css';

//회의실 예약 페이지
const RoomReservationPage = props => {
  const roomId = props.match.params.idx; //회의실 id 조회페이지에서 전달받음
  const [cookie] = useCookies(['access_token']);

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
