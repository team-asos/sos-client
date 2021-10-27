import React from 'react';
import NavBarUser from '../components/u_navBar';
import SeatStatusForm from '../components/u5_seatStatusForm';
import UserSearchForm from '../components/u5_userSearchForm';
import DateTimeForm from '../components/u5_dateTimeForm';
import ButtonForm from '../components/u5_confirmButton';
import '../assets/styles/u5_seatPage.css';

class SeatPage extends React.Component {
  render() {
    return (
      <div className="userSeatPage">
        <div>
          <NavBarUser />
        </div>

        <div className="userSeatForm">
          <div className="u_seatHeader">
            <div className="u_seatHeaderTextStyle">좌석 예약</div>
          </div>

          <div className="userSeatReservationForm">
            {/*좌석 도면, 시설, 좌석 현황*/}
            <div className="u_leftForm">
              <SeatStatusForm />
            </div>

            {/*임직원 검색창, 예약시간, 예약하기 버튼*/}
            <div className="u_rightForm">
              <UserSearchForm />
              <DateTimeForm />

              {/*<button
                className="u_seatReservationButton"
              >
                예약하기
              </button>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SeatPage;
