import React, { useState } from 'react';
import FacilityForm from '../components/u5_facilityForm';
import * as BsIcon from 'react-icons/bs';
import '../assets/styles/u5_seatStatusForm.css';

//좌석 예약 페이지->좌석 도면, 사용현황, 층
const FloorData = {
  floorList: [
    { id: 0, name: '1F' },
    { id: 1, name: '2F' },
    { id: 2, name: '3F' },
    { id: 3, name: '6F' },
    { id: 4, name: '7F' },
  ],
};

const SeatStatusForm = () => {
  const [isToggleOn, setIsToggleOn] = useState(1);
  const [myfloorList, setmyFloorList] = useState([]); //db 데이터
  const res = () => {
    fetch('http://localhost:3000/users', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setmyFloorList(json);
      });
  };
  console.log(myfloorList);
  const handleClick = e => {
    setIsToggleOn(!isToggleOn);
    isToggleOn
      ? (e.target.style.color = '#820101')
      : (e.target.style.color = 'black');
  };

  const [floorName, setFloorName] = useState(FloorData.floorList[0].name);
  const changeFloorText = name => {
    setFloorName(name);
  };
  return (
    <div className="seatForm">
      <div className="u_seatFormUpper">
        {/*층 이름, 시설 아이콘, 좌석 현황 */}
        <div className="selectedFloorName">
          <p className="selectedFloorNameTextStyle">{floorName}</p>
        </div>

        <div className="statusForm">
          <div className="showFacility">
            {/*시설 아이콘*/}
            <div className="facility-icon-box">
              <div className="facility-icon-div">
                <BsIcon.BsFillInfoCircleFill
                  className="facilityicon"
                  size={35}
                  onClick={handleClick}
                ></BsIcon.BsFillInfoCircleFill>
              </div>
            </div>
          </div>
          {/*좌석 현황*/}
          <div className="reservedSeats">
            <div className="reservedSeatShape"></div>
            <p className="reservedSeatsTextStyle">사용 좌석 20석</p>
          </div>
          <div className="ableSeats">
            <div className="ableSeatShape"></div>
            <p className="ableSeatsTextStyle">예약 가능 13석</p>
          </div>
        </div>
      </div>

      <div className="u_seatFormBottom">
        <div className="seatLayout">{isToggleOn ? '' : <FacilityForm />}</div>
        <div className="floorList">
          {/*
                    첫 번째 버튼은 눌려져 있게 구현해야함
                    버튼에 맞게 해당 층의 좌석 컴포넌트를 불러와야함
                     */}
          {FloorData.floorList.map(item => (
            <button
              className="u_floorNameButton"
              onClick={() => changeFloorText(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatStatusForm;
