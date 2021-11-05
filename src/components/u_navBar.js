import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import AppBar from './u_appBar';
import TimeBar from './2_timeBar';

import '../assets/styles/a2_navBox.css';

const NavBar = () => {
  const history = useHistory();

  const [cookie, removeCookie] = useCookies(['access_token']);

  useEffect(() => {
    if (cookie.access_token === 'undefined') {
      history.push('/');
    }
  }, [cookie]);

  const logoutClickHandler = () => {
    removeCookie('access_token');
  };

  return (
    <div className="navBox">
      <Link to="seat-reservation">
        <div className="logoBar"></div>
      </Link>
      <div className="appBar">
        <AppBar />
      </div>
      <div className="logOutBar">
        <p className="logOutTextStyle" onClick={() => logoutClickHandler()}>
          로그아웃
        </p>
      </div>
      <div className="dateBar">
        <TimeBar />
      </div>
    </div>
  );
};

export default NavBar;
