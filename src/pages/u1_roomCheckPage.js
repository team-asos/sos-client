import React from 'react';
import NavBarUser from '../components/u_navBar';
import { Table, Dropdown } from 'react-bootstrap';
import '../assets/styles/u1_roomCheckPage.css';

//회의실 조회 페이지
class RoomCheckPage extends React.Component {
  render() {
    return (
      <div>
        <NavBarUser />
        <div className="header1">
          <br></br>
          <p className="rcp-textStyle">회의실 조회</p>
        </div>
        <div>
          <p className="rcp-">회의실 조회</p>
        </div>
      </div>
    );
  }
}

export default RoomCheckPage;
