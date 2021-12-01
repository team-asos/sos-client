import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import * as fi from 'react-icons/fi';

import AppBar from './u_appBar';
import TimeBar from './2_timeBar';

import '../assets/styles/a2_navBox.css';

const NavBar = props => {
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
      <Link to="/seat-reservation">
        <div className="logoBar"></div>
      </Link>
      <div className="appBar">
        <AppBar />
      </div>
      <div className="logOutBar">
        <fi.FiLogOut
          className="logout-icon"
          style={{ marginBottom: '5%' }}
          size={22}
          onClick={logoutClickHandler}
        />
        <p>
          <span style={{ fontWeight: 'bolder' }}>{user.name}</span>님
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
        ></div>
      </div>
    </div>
  );
};

export default NavBar;
