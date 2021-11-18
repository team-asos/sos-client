import React, { useState } from 'react';
import NavBarUser from '../components/u_navBar';
import RoomInfoTable from '../components/u1_roomInfoTable';
import { Link } from 'react-router-dom';
import '../assets/styles/u1_roomCheckPage.css';
import { useMediaQuery } from 'react-responsive';
import { FiMenu, FiX } from 'react-icons/fi';
//회의실 조회 페이지
const RoomCheckPage = () => {
  const [open, setOpen] = useState(false);
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const navClick = () => {
    console.log('clicked');
    setOpen(1);
    return <NavBarUser />;
  };
  return (
    <div className="roomCheckPage">
      <div>{isPc ? <NavBarUser /> : ''}</div>

      <div className="roomCheckForm">
        <div className="checkHeader">
          <div>
            {isMobile ? <FiMenu size={40} onClick={() => navClick} /> : ''}
          </div>
          <div className="roomCheck_titleTextStyle">
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

        <div className="roomInfoTable">
          <RoomInfoTable />
        </div>
      </div>
    </div>
  );
};

export default RoomCheckPage;
