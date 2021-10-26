import React from 'react';
import '../assets/styles/u4_myReservationListForm.css';

class MyReservationLisForm extends React.Component {
  render() {
    return (
      <div className="myReservationListForm">
        <p className="myReservationListFormTitleTextStyle">나의 예약 내역</p>

        <div className="myReservationList">
          <div className="myReservationDetail">
            <p className="rvDate">21/10/22</p>
            <p className="rvTime">시간</p>
            <p className="rvFloor">3층</p>
            <p className="rvSeatNum">15번</p>
            <p className="rvStatus">사용중</p>
          </div>

          <div className="myReservationDetail">
            <p className="rvDate">21/10/22</p>
            <p className="rvTime">시간</p>
            <p className="rvFloor">3층</p>
            <p className="rvSeatNum">15번</p>
            <p className="rvStatus">사용중</p>
          </div>
        </div>
      </div>
    );
  }
}
export default MyReservationLisForm;
