import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Logo from '../assets/images/new_logo_shadow_3.png';
import noLogo from '../assets/images/new_logo.png';

import '../assets/styles/1_loginPage.css';
import '../assets/fonts/font.css';

const Login = () => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

  const isMobile = useMediaQuery({ query: '(max-width:767px)' });

  const history = useHistory();
  const [cookie, setCookie] = useCookies(['access_token']);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const getAuth = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      },
    );

    const data = await response.json();

    if (data.role === 0) history.push('/seat-reservation');
    else if (data.role === 1) history.push('/user-management');
  };

  useEffect(() => {
    if (cookie.access_token !== 'undefined') getAuth();
  }, [cookie]);

  const loginClickHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(login),
      },
    );

    const data = await response.json();

    if (response.status === 200) {
      setCookie('access_token', data.access_token);
    } else {
      alert(data.message);
    }
  };

  const loginEnterHandler = e => {
    if (e.key === 'Enter') loginClickHandler();
  };

  const inputEmail = e => {
    setLogin({ ...login, email: e.target.value });
  };

  const inputPw = e => {
    setLogin({ ...login, password: e.target.value });
  };

  return (
    <>
      {isPc && (
        <div
          className="login"
          onKeyPress={e => {
            loginEnterHandler(e);
          }}
        >
          <div className="left">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="right">
            <div className="login-form">
              <div>
                <label>
                  ?????????
                  <input
                    type="text"
                    className="form-control-login"
                    placeholder="???????????? ??????????????????."
                    onChange={inputEmail}
                    value={login.email}
                  />
                </label>
              </div>
              <div style={{ marginTop: '2%' }}>
                <label>
                  ????????????
                  <input
                    type="password"
                    className="form-control-login"
                    placeholder="??????????????? ??????????????????."
                    onChange={inputPw}
                    value={login.password}
                  />
                </label>
              </div>
            </div>
            <button
              className="Button Login"
              onClick={() => {
                loginClickHandler();
              }}
            >
              ?????????
            </button>
            <p className="or">????????? ????????????????</p>
            <Link to="/sign-up">
              <button className="Button Register">????????????</button>
            </Link>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="m-login">
          <div className="m-upper">
            <img src={noLogo} alt="Logo" />
          </div>

          <div className="m-bottom">
            <div className="m-login-form" style={{ marginBottom: '15px' }}>
              <input
                type="text"
                className="m-form-control-login"
                placeholder="?????????"
                onChange={inputEmail}
                value={login.email}
              />
              <input
                type="password"
                className="m-form-control-login"
                placeholder="????????????"
                onChange={inputPw}
                value={login.password}
              />
            </div>
            <button className="m-button-login" onClick={loginClickHandler}>
              ?????????
            </button>
            <p className="m-or">????????? ????????????????</p>
            <Link to="/sign-up" style={{ textDecoration: 'none' }}>
              <p
                style={{
                  textDecoration: 'underline rgb(151,32,32)',
                  color: 'rgb(151,32,32)',
                  cursor: 'pointer',
                  fontSize: '0.9em',
                  marginTop: '4%',
                }}
              >
                ????????????
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
