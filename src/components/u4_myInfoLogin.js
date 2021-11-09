import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import MyInfo from './u4_myInfoForm';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import '../assets/styles/u4_myInfoLogin.css';
//마이페이지->나의 정보 수정
//const myInfoForm = () => <MyInfo />;

const MyInfoLoginForm = () => {
  const [data, setData] = useState();
  const [cookie, setCookie] = useCookies(['access_token']);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const inputEmail = e => {
    setLogin({ email: e.target.value });
  };

  const inputPw = e => {
    setLogin({ password: e.target.value });
  };
  const loginAgainClickHandler = async () => {
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
    console.log(cookie);
    console.log(data);
    if (response.status === 200) {
      setCookie('access_token', data.access_token);
    } else {
      alert(data.message);
    }
    console.log(data);
    if (
      cookie.access_token ===
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwib…TM2fQ.9IW1GQCTPiyNYW1koLbHWOcky_ZouUxL3EVebCQlSAk'
    ) {
      window.location.href = '/seat-reservation';
    }
  };

  return (
    <div className="myInfoLoginForm">
      <p className="myInfoLoginTitleTextStyle">나의 정보 수정</p>
      <p className="myInfoLoginDetailTextStyle">
        정보 수정을 위해 다시 로그인 해 주세요.
      </p>

      <div className="u4_loginForm">
        <img src={Logo} alt="Logo" style={{ width: '35%' }} />
        <div className="loginInput">
          <input
            type="text"
            className="u4_loginControl"
            placeholder="이메일"
            onChange={inputEmail}
            value={login.email}
          />
          <input
            type="password"
            className="u4_loginControl"
            placeholder="비밀번호"
            onChange={inputPw}
            value={login.password}
          />
        </div>
        <div className="u4_loginBtns">
          <button className="u4_cancelBtn">취소</button>
          <Link to="/user-mypage/myinfo">
            <button className="u4_confirmBtn" onClick={loginAgainClickHandler}>
              확인
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MyInfoLoginForm;
