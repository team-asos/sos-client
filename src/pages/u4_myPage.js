import React, { useState } from 'react';
import NavBarUser from '../components/u_navBar';
import { Link } from 'react-router-dom';
import MyInfo from '../components/u4_myInfoForm';
import ConfirmLogin from './1_loginPage';
import MyReservationList from '../components/u4_myReservationListForm';
import '../assets/styles/u4_myPage.css';

const tabBar = {
  0: <MyReservationList />,
  1: <MyInfo />,
};

//유저 마이페이지
class UserMyPage extends React.Component {
  state = {
    activeId: 0,
  };

  clickHandler = id => {
    this.setState({ activeId: id });
  };

  render() {
    return (
      <div className="userMyPage">
        <div>
          <NavBarUser />
        </div>

        <div className="u_myPageForm">
          <div className="u_myPageHeader">
            <p className="u_myPageHeaderTextStyle">
              <Link
                to="/user-mypage"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                마이페이지
              </Link>
            </p>

            <p
              onClick={() => this.clickHandler(0)}
              className="myRLMenuTextStyle"
            >
              나의 예약 내역
            </p>
            <p
              onClick={() => this.clickHandler(1)}
              className="myInfoMenuTextStyle"
            >
              나의 정보 수정
            </p>
          </div>

          <div className="myPageContents">{tabBar[this.state.activeId]}</div>
        </div>
      </div>
    );
  }
}

export default UserMyPage;
