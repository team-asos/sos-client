import React from 'react';
import NavBarUser from '../components/u_navBar';
import '../assets/styles/u3_inquirePage.css';
import TabMenu from '../components/u3_tabMenu';

//문의하기 페이지
class InquirePage extends React.Component {
  render() {
    return (
      <div className="inquirePage">
        <div>
          <NavBarUser />
        </div>

        <div className="inquireForm_main">
          <div className="inquireHeader">
            <p className="inquire_titleTextStyle">문의하기</p>
          </div>
          <div>
            <TabMenu />
          </div>
        </div>
      </div>
    );
  }
}

export default InquirePage;
