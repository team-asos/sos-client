import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/logo.png';
import '../assets/styles/1_loginPage.css';

function Login() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = e => {
    setInputId(e.target.value);
  };

  const handleInputPw = e => {
    setInputPw(e.target.value);
  };

  const onClickLogin = (inputId, inputPw) => {
    console.log(inputId + ' : ' + inputPw);
  };

  return (
    <div className="container login">
      <div className="left">
        <img src={Logo} alt="Logo Image" style={{ width: '80%' }} />
      </div>
      <div className="line"> </div>
      <div className="right">
        <div className="login-form" style={{ marginBottom: '17px' }}>
          <input
            type="text"
            className="form-control-login"
            placeholder="이메일"
            value={inputId}
            onChange={handleInputId}
          />
          <input
            type="text"
            className="form-control-login"
            placeholder="비밀번호"
            value={inputPw}
            onChange={handleInputPw}
          />
        </div>

        <div></div>

        <button
          className="Button Login"
          onClick={(inputId, inputPw => onClickLogin(inputId, inputPw))}
        >
          로그인
        </button>
        <p className="or">계정이 없으신가요?</p>
        <Link to="/sign-up">
          <button className="Button Register">회원가입</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
