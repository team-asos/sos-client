import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/logo.png';
import '../assets/styles/1_loginPage.css'

class Login extends React.Component {
  render() {
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
            />
            <input
              type="text"
              className="form-control-login"
              placeholder="비밀번호"
            />
          </div>
          <button className="Button Login">로그인</button>
          <p className="or">계정이 없으신가요?</p>
          <Link to="/sign-up">
            <button className="Button Register">회원가입</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
