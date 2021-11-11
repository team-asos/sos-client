import React, { useState } from 'react';
import '../assets/styles/u4_myInfoLogin.css';
//마이페이지->나의 정보 수정 다시 로그인

const MyInfoLoginForm = () => {
  const [pw, setPw] = useState('');
  const inputPw = e => {
    setPw(e.target.value);
  };
  const loginAgainClickHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email: 'jw@sos.com', //나중에 받아와야됨
          password: pw,
        }),
      },
    );

    if (response.status === 200) {
      window.location.href = 'user-mypage-myinfo';
    } else {
      alert(response.status);
    }
  };

  return (
    <div className="myInfoLoginForm">
      <p className="myInfoLoginTitleTextStyle">나의 정보 수정</p>
      <p className="myInfoLoginDetailTextStyle">
        정보 수정을 위해 비밀번호를 입력해주세요.
      </p>

      <div className="u4_loginForm">
        <input
          type="password"
          className="u4_loginControl"
          placeholder="비밀번호"
          onChange={inputPw}
          value={pw}
        />
        <button className="u4_confirmBtn" onClick={loginAgainClickHandler}>
          확인
        </button>
      </div>
    </div>
  );
};
export default MyInfoLoginForm;
