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

  const [loading, setLoading] = useState(0);
  const [name, setName] = useState('');

  const history = useHistory();
  const [cookie, setCookie] = useCookies(['access_token']);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const getAuth = async () => {
    setLoading(1);
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
    setName(data.name);

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

  const inputEmail = e => {
    setLogin({ ...login, email: e.target.value });
  };

  const inputPw = e => {
    setLogin({ ...login, password: e.target.value });
  };

  return (
    <>
      {isPc && (
        <div className="login">
          <div className="left">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="right">
            <div className="login-form">
              <div>
                <label>
                  이메일
                  <input
                    type="text"
                    className="form-control-login"
                    placeholder="이메일을 입력해주세요."
                    onChange={inputEmail}
                    value={login.email}
                  />
                </label>
              </div>
              <div style={{ marginTop: '2%' }}>
                <label>
                  비밀번호
                  <input
                    type="password"
                    className="form-control-login"
                    placeholder="비밀번호를 입력해주세요."
                    onChange={inputPw}
                    value={login.password}
                  />
                </label>
              </div>
            </div>
            <button className="Button Login" onClick={loginClickHandler}>
              로그인
            </button>
            <p className="or">계정이 없으신가요?</p>
            <Link to="/sign-up">
              <button className="Button Register">회원가입</button>
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
                placeholder="이메일"
                onChange={inputEmail}
                value={login.email}
              />
              <input
                type="password"
                className="m-form-control-login"
                placeholder="비밀번호"
                onChange={inputPw}
                value={login.password}
              />
            </div>
            <button className="m-button-login" onClick={loginClickHandler}>
              로그인
            </button>
            <p className="m-or">계정이 없으신가요?</p>
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
                회원가입
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
