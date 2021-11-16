import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import AppBar from './a2_appBar';
import TimeBar from './2_timeBar';
import '../assets/styles/a2_navBox.css';

const NavBox = () => {
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

  return (
    <div className="navBox">
      <Link to="/user-management">
        <div className="logoBar"></div>
      </Link>
      <div className="appBar">
        <AppBar />
      </div>
      <div className="logOutBar">
        <p className="logOutTextStyle" onClick={logoutClickHandler}>
          로그아웃
        </p>
      </div>
      <div className="dateBar">
        <TimeBar />
        <div
          style={{
            textAlign: 'center',
            fontSize: '1.3em',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {user.name}님
        </div>
      </div>
    </div>
  );
};

export default NavBox;
