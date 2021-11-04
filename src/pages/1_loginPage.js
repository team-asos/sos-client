import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/logo.png';
import '../assets/styles/1_loginPage.css';

const Login = () => {
  // const [asd, setAsd] = useState({});

  // const registerHandler = async () => {
  //   const result = await fetch(`${REACT_APP_SERVER_BASE_URL}/users`, {
  //     headers: {
  //       'Content-type': 'application/json'
  //     }
  //     method: 'POST',
  //     body: JSON.stringfy(asd)

  //   })

  //   if (result.status === 201) {
  //     alert('회원가입 성공')
  //   }
  // }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]); //유저 정보 불러오는거
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setData(json);
        });
    };
    res();
  }, []);

  const loginClickHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    //pw검사도 해야함..........
    for (let i = 0; i < data.length; i++) {
      if (email == data[i].email /*||password != data[i].password*/) {
        //사용자or관리자 페이지 이동
        if (!data[i].role) window.location.href = '/seat-reservation';
        else window.location.href = '/user-management';
        break;
      }
      if (
        i == data.length - 1 &&
        email != data[i].email /*||password != data[i].password*/
      ) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    }
  };
  const inputEmail = e => {
    setEmail(e.target.value);
  };

  const inputPw = e => {
    setPassword(e.target.value);
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
            onChange={inputEmail}
            value={email}
          />
          <input
            type="password"
            className="form-control-login"
            placeholder="비밀번호"
            onChange={inputPw}
            value={password}
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
