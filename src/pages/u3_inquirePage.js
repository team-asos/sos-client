import React from 'react';
import { Link } from 'react-router-dom';
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
            <div className="inquire_titleTextStyle">
              <Link
                to="/inquire"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                문의하기
              </Link>
            </div>
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
