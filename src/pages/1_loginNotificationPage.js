import React, { Component } from 'react';
import soslogo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import '../assets/styles/1_loginNotificationPage.css';
//이미 있는 계정 알림
class LoadingNotification extends React.Component {
  render() {
    return (
      <div className="loadingForm">
        <div className="loadingLogo">
          <img src={soslogo}></img>
        </div>

        <div>
          <p className="notiMessage">이미 존재하는 계정입니다.</p>
        </div>

        <div>
          <Link to="/">
            <button className="goToLogin">로그인 페이지로 이동</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LoadingNotification;
