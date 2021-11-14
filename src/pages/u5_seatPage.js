import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBarUser from '../components/u_navBar';
import SeatStatusForm from '../components/u5_seatStatusForm';
import UserSearchForm from '../components/u5_userSearchForm';
import DateTimeForm from '../components/u5_dateTimeForm';
import { useCookies } from 'react-cookie';

import '../assets/styles/u5_seatPage.css';
//좌석 예약 페이지
const SeatPage = () => {
  const [myId, setMyId] = useState();
  const [cookie] = useCookies(['access_token']);

  /*내 정보 */
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setMyId(json.id);
        });
    };
    res();
  }, []);
  return (
    <div className="userSeatPage">
      <div>
        <NavBarUser />
      </div>

      <div className="userSeatForm">
        <div className="u_seatHeader">
          <div className="u_seatHeaderTextStyle">
            <Link
              to="/seat-reservation"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              좌석 예약
            </Link>
          </div>
        </div>

        <div className="userSeatReservationForm">
          {/*좌석 도면, 시설, 좌석 현황*/}
          <div className="u_leftForm">
            <SeatStatusForm />
          </div>

          {/*임직원 검색창, 예약시간, 예약하기 버튼*/}
          <div className="u_rightForm">
            <DateTimeForm myId={myId} />
            <UserSearchForm />

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
};
export default SeatPage;
