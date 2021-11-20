import React, { useState } from 'react';
import '../assets/styles/u4_myInfoLogin.css';
//마이페이지->나의 정보 수정 다시 로그인

const MyInfoLoginForm = props => {
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
          email: props.user.email,
          password: pw,
        }),
      },
    );

    if (response.status === 200) {
      window.location.href = `user-mypage-myinfo/${props.user.id}`;
    } else if (response.status === 401) {
      alert('비밀번호가 잘못되었습니다.');
    } else {
      alert(response.status);
    }
  };

  return (
    <div className="myInfoLoginForm">
      <p className="myInfoLoginTitleTextStyle">나의 정보 수정</p>
      <p className="myInfoLoginDetailTextStyle">
        본인 확인을 위해 비밀번호를 입력해주세요.
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
