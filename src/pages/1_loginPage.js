import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';

import Logo from '../assets/images/logo.png';

import '../assets/styles/1_loginPage.css';

const Login = () => {
  const history = useHistory();

  const [cookie, setCookie] = useCookies(['access_token']);

  useEffect(() => {
    if (cookie.access_token !== 'undefined') {
      loginCheckHandler(cookie.access_token);
    }
  }, [cookie]);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const loginCheckHandler = async access_token => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        method: 'GET',
      },
    );

    const res = await result.json();

    if (result.status === 200) {
      if (res.role === 0) history.push('/seat-reservation');
      else if (res.role === 1) history.push('/user-management');
    }
  };

  const loginClickHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(login),
      },
    );

    const res = await result.json();

    if (result.status === 200) {
      setCookie('access_token', res.access_token);
    } else {
      alert(res.message);
    }
  };

  const inputEmail = e => {
    setLogin({ ...login, email: e.target.value });
  };

  const inputPw = e => {
    setLogin({ ...login, password: e.target.value });
  };

  return (
    <div className="container login">
      <div className="left">
        <img src={Logo} alt="Logo" style={{ width: '80%' }} />
      </div>
      <div className="line"> </div>
      <div className="right">
        <div className="login-form" style={{ marginBottom: '17px' }}>
          <input
            type="text"
            className="form-control-login"
            placeholder="이메일"
            onChange={inputEmail}
            value={login.email}
          />
          <input
            type="password"
            className="form-control-login"
            placeholder="비밀번호"
            onChange={inputPw}
            value={login.password}
          />
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
  );
};

export default Login;
