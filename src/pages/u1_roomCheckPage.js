import React, { useState } from 'react';
import NavBarUser from '../components/u_navBar';
import MobileNavBar from '../components/u_m_navBar';
import RoomInfoTable from '../components/u1_roomInfoTable';
import { Link } from 'react-router-dom';
import '../assets/styles/u1_roomCheckPage.css';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';

//회의실 조회 페이지
const RoomCheckPage = () => {
  const [open, setOpen] = useState(false);
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const navClick = () => {
    setOpen(!open);
  };
  return (
    <div className="roomCheckPage">
      <div>{isPc ? <NavBarUser /> : ''}</div>

      <div className={isPc ? 'roomCheckForm' : 'm_roomCheckForm'}>
        <div className="checkHeader">
          <div>
            {isMobile ? (
              <FiMenu
                size={40}
                onClick={navClick}
                style={{ color: '#820101' }}
              />
            ) : (
              ''
            )}
          </div>

          <div
            className={
              isPc ? 'roomCheck_titleTextStyle' : 'm_roomCheck_titleTextStyle'
            }
          >
            <Link
              to="/room-check"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              회의실 조회
            </Link>
          </div>
        </div>
        {open ? <MobileNavBar open={open} /> : ''}
        <div className="roomInfoTable">
          <RoomInfoTable />
        </div>
      </div>
    </div>
  );
};

export default RoomCheckPage;
