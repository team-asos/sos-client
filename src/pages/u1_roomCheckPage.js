import React from 'react';
import NavBarUser from '../components/u_navBar';
import RoomInfoTable from '../components/u1_roomInfoTable';
import { Link } from 'react-router-dom';
import '../assets/styles/u1_roomCheckPage.css';

//회의실 조회 페이지
class RoomCheckPage extends React.Component {
  render() {
    return (
      <div className="roomCheckPage">
        <div>
          <NavBarUser />
        </div>

        <div className="roomCheckForm">
          <div className="checkHeader">
            <div className="roomCheck_titleTextStyle">
              <Link
                to="/room-check"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                회의실 조회
              </Link>
            </div>
          </div>

          <div className="roomInfoTable">
            <RoomInfoTable />
          </div>
        </div>
      </div>
    );
  }
}

export default RoomCheckPage;
