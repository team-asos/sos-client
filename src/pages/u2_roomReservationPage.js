import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import NavBarUser from '../components/u_navBar';
import MobileNavBar from '../components/u_m_navBar';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import SelectedRoomTable from '../components/u2_selectedRoomTable';
import '../assets/styles/u2_roomReservationPage.css';

//회의실 예약 페이지
const RoomReservationPage = props => {
  const [open, setOpen] = useState(false);
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const navClick = () => {
    setOpen(!open);
  };
  const roomId = props.match.params.idx;
  const [cookie] = useCookies(['access_token']);
  const history = useHistory();

  return (
    <div className="roomReservationPage">
      <div>{isPc ? <NavBarUser /> : null}</div>

      <div className={isPc ? 'reservationForm' : 'm_reservationForm'}>
        {isPc ? null : (
          <div className="m_reservationHeader">
            <div>
              <FiMenu
                size={30}
                onClick={navClick}
                style={{
                  color: 'firebrick',
                  marginLeft: '10px',
                  marginTop: '-4px',
                }}
              />
            </div>
            <div className="m_roomCheck_titleTextStyle">회의실 예약</div>
          </div>
        )}

        {open ? <MobileNavBar open={open} /> : ''}

        <div className="srTable">
          <SelectedRoomTable roomID={roomId} />
        </div>
      </div>
    </div>
  );
};

export default RoomReservationPage;
