import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import '../assets/styles/u4_myInfoLogin.css';
//마이페이지->탈퇴

const DeleteAccount = props => {
  const history = useHistory();

  const [cookie, removeCookie] = useCookies(['access_token']);
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
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/${props.user.id}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${cookie.access_token}`,
          },
          method: 'DELETE',
        },
      );
      if (response.status === 200) {
        removeCookie('access_token');
        alert('탈퇴가 완료되었습니다.');
      }
    } else {
      alert(response.status);
    }
  };
  useEffect(() => {
    if (cookie.access_token === 'undefined') {
      history.push('/');
    }
  }, [cookie]);
  return (
    <div className="myInfoLoginForm">
      <p className="myInfoLoginTitleTextStyle">회원 탈퇴</p>
      <p className="myInfoLoginDetailTextStyle">
        탈퇴하시려면 비밀번호를 입력해주세요.
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
export default DeleteAccount;
