import React, { useState, useEffect } from 'react';
import NavBarUser from '../components/u_navBar';
import { Link } from 'react-router-dom';
import MyInfoLogin from '../components/u4_myInfoLogin';
import { useCookies } from 'react-cookie';
import MyReservationList from '../components/u4_myReservationListForm';
import MobileNavBar from '../components/u_m_navBar';
import { FiMenu } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';
import '../assets/styles/u4_myPage.css';

//유저 마이페이지
const UserMyPage = props => {
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
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const navClick = () => {
    setOpen(!open);
  };
  const tabBar = {
    0: <MyReservationList user={user} />,
    1: <MyInfoLogin user={user} />, //나중에 email 받아서 인증해야해서
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
        <div className="u_myPageHeader">
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
              isPc ? 'u_myPageHeaderTextStyle' : 'm_u_myPageHeaderTextStyle'
            }
          >
            마이페이지
          </div>

          <div
            onClick={() => clickHandler(0)}
            className={isPc ? 'myRLMenuTextStyle' : 'm_myPageMenuText'}
          >
            {isPc ? '나의 예약 내역' : '예약 내역'}
          </div>
          <div
            onClick={() => clickHandler(1)}
            className={isPc ? 'myInfoMenuTextStyle' : 'm_myPageMenuText'}
          >
            {isPc ? '나의 정보 수정' : '정보 수정'}
          </div>
        </div>
        {open ? <MobileNavBar open={open} /> : ''}

        <div className="myPageContents">{getPage()}</div>
      </div>
    </div>
  );
};

export default UserMyPage;
