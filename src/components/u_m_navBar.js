import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
/* 아이콘 컬러 전체 변경 기능 */
import { IconContext } from 'react-icons';
import * as MdIcon from 'react-icons/md';
import * as HiIcon from 'react-icons/hi';
import { FiX } from 'react-icons/fi';

import TimeBar from './2_timeBar';

import '../assets/styles/u_m_navBar.css';

const MobileNavBar = props => {
  const history = useHistory();
  const [cookie, removeCookie] = useCookies(['access_token']);

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

  useEffect(() => {
    if (cookie.access_token === 'undefined') {
      history.push('/');
    }
  }, [cookie]);

  const logoutClickHandler = () => {
    removeCookie('access_token');
  };

  const [sidebar, setSidebar] = useState(props.open);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      {/* 아이콘 컬러 전체 변경 기능 */}
      <IconContext.Provider value={{ color: '#820101' }}>
        <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <FiX size={35} onClick={showSidebar} className="closeBtn" />
          <div className="nav-menu-items" onClick={showSidebar}>
            <div className="oneMenu">
              <Link
                to="/seat-reservation"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <MdIcon.MdEventSeat className="m_icon" size={32} />
                <p className="iconText">좌석 예약</p>
              </Link>
            </div>
            <div className="oneMenu">
              <Link
                to="/room-check"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <MdIcon.MdMeetingRoom className="m_icon" size={32} />
                <p className="iconText">회의실 예약</p>
              </Link>
            </div>
            <div className="oneMenu">
              <Link
                to="/inquire"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <MdIcon.MdQuestionAnswer className="m_icon" size={32} />
                <p className="iconText">문의하기</p>
              </Link>
            </div>
            <div className="oneMenu">
              <Link
                to="/user-mypage"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <HiIcon.HiUserCircle className="m_icon" size={32} />
                <p className="iconText">마이페이지</p>
              </Link>
            </div>
          </div>

          <div className="logOutBar">
            <p>
              {' '}
              <span style={{ fontWeight: 'bolder' }}>{user.name}</span>님
            </p>

            <p className="logOutTextStyle" onClick={logoutClickHandler}>
              로그아웃
            </p>
          </div>
          <TimeBar className="mobileTimeBar" />
        </div>
      </IconContext.Provider>
    </>
  );
};
export default MobileNavBar;
