import React from 'react';
import NavBarUser from '../components/u_navBar';
import '../assets/styles/u1_roomCheckPage.css';
import RoomInfoTable from '../components/u1_roomInfoTable';

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
            <p className="roomCheck_titleTextStyle">회의실 조회</p>
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
