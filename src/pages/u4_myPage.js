import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';
import { useCookies } from 'react-cookie';

//isPc import 파일들
import NavBarUser from '../components/u_navBar';
import MyPageBox from './u4_myPageBox';

//isMobile import 파일들
import MobileNavBar from '../components/u_m_navBar';
import SeatReservationInfo from '../components/u4_seatReservationInfo';
import RoomReservationInfo from '../components/u4_roomReservationInfo';

import '../assets/styles/u4_myPage.css';

const UserMyPage = () => {
  const [cookie] = useCookies(['access_token']);

  const [user, setUser] = useState({});
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setUser(json);
        });
    };
    res();
  }, []);

  const [open, setOpen] = useState(false);
  const navClick = () => {
    setOpen(!open);
  };

  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });

  const tabBar = {
    0: (
      <>
        <SeatReservationInfo user={user} />
        <RoomReservationInfo user={user} />
      </>
    ),
    1: <MyPageBox user={user} />,
  };
  const [state, setState] = useState(0);
  const clickHandler = id => {
    setState(id);
  };

  const getPage = () => {
    if (state === 0) {
      return tabBar[0];
    } else if (state === 1) {
      return tabBar[1];
    }
  };

  return (
    <div className="userMyPage">
      <div>{isPc ? <NavBarUser /> : null}</div>
      <div className={isPc ? 'u_myPageForm' : 'm_u_myPageForm'}>
        {isPc ? null : (
          <div className="m_u_myPageHeader">
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
            <div className="m_u_myPageHeaderTextStyle">마이페이지</div>

            <div onClick={() => clickHandler(0)} className="m_myPageMenuText">
              예약 내역
            </div>
            <div onClick={() => clickHandler(1)} className="m_myPageMenuText">
              정보 조회
            </div>
          </div>
        )}

        {open ? <MobileNavBar open={open} /> : null}
        <div className={isPc ? 'myPageContents' : 'm_myPageContents'}>
          {isMobile ? getPage() : <MyPageBox user={user} />}
        </div>
      </div>
    </div>
  );
};

export default UserMyPage;
