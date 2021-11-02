import React from 'react';
import MyInfo from './u4_myInfoForm';
import { Link } from 'react-router-dom';
import '../assets/styles/u4_myInfoLogin.css';
//마이페이지->나의 정보 수정
const myInfoForm = () => <MyInfo />;

class MyInfoLoginForm extends React.Component {
  render() {
    return (
      <div className="myInfoLoginForm">
        <p className="myInfoLoginTitleTextStyle">나의 정보 수정</p>
        <p className="myInfoLoginDetailTextStyle">
          정보 수정을 위해 다시 로그인 해 주세요.
        </p>

        <div className="u4_loginForm">
          <div className="loginInput">
            <input
              type="text"
              className="u4_loginControl"
              placeholder="이메일"
            />
            <input
              type="text"
              className="u4_loginControl"
              placeholder="비밀번호"
            />
          </div>
          <div className="u4_loginBtns">
            <button className="u4_cancelBtn">취소</button>
            <Link to="/user-mypage/myinfo">
              <button className="u4_confirmBtn">확인</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default MyInfoLoginForm;
