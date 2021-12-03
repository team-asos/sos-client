import React from 'react';
import { Link } from 'react-router-dom';

import AccountIcon from './icons/u_accountIcon';
import SeatReservationIcon from './icons/u_seatReservationIcon';
import RoomReservationIcon from './icons/u_roomReservationIcon';
import InquireIcon from './icons/u_inquireIcon';
import SearchIcon from './icons/u_searchIcon';

const AppBox = () => {
  return (
    <div>
      <Link to="/seat-reservation" style={{ color: 'black' }}>
        <SeatReservationIcon />
      </Link>
      <Link to="/room-check" style={{ color: 'black' }}>
        <RoomReservationIcon />
      </Link>
      <Link to="/search" style={{ color: 'black' }}>
        <SearchIcon />
      </Link>
      <Link to="/inquire" style={{ color: 'black' }}>
        <InquireIcon />
      </Link>
      <Link to="/user-mypage" style={{ color: 'black' }}>
        <AccountIcon />
      </Link>
    </div>
  );
};

export default AppBox;
