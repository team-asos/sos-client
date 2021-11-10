import React, { useCallback, useEffect, useState } from 'react';
import FacilityForm from '../components/u5_facilityForm';
import * as BsIcon from 'react-icons/bs';
import '../assets/styles/u5_seatStatusForm.css';

//좌석 예약 페이지->좌석 도면, 사용현황, 층
const FloorData = {
  floorList: [
    { id: 0, name: '1층' },
    { id: 1, name: '2층' },
    { id: 2, name: '3층' },
    { id: 3, name: '6층' },
    { id: 4, name: '7층' },
  ],
};

const SeatStatusForm = () => {
  const [data, setData] = useState([]);
  //const button = React.createRef();
  const [isToggleOn, setIsToggleOn] = useState(1);
  const [myfloorList, setmyFloorList] = useState([]); //db 데이터
  //특정 층의 좌석 도면을 가져오도록 수정해야함
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/floors`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setmyFloorList(json);
        });
    };
    res();
  }, []);
  const handleClick = e => {
    setIsToggleOn(!isToggleOn);
    isToggleOn
      ? (e.target.style.color = '#820101')
      : (e.target.style.color = 'black');
  };
  const [floorName, setFloorName] = useState(FloorData.floorList[0].name);
  //useState(myfloorList[0].name)안됨
  // const changeFloorText = name => {
  //   setFloorName(name);
  //   button.current.focus();
  // };
  const changeFloorText = e => {
    setFloorName(e.name);
    //button.current.focus();
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
                  style={{ cursor: 'pointer' }}
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
          {myfloorList.map((item, idx) => (
            <button
              key={idx}
              //ref={button}
              className="u_floorNameButton"
              onClick={() => changeFloorText(item)}
              style={
                idx === 0
                  ? {
                      //backgroundColor: '#820101',

                      backgroundColor: '#737272',
                    }
                  : {
                      backgroundColor: '#737272',
                    }
              }
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
