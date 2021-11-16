import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import FacilityForm from '../components/u5_facilityForm';
import * as BsIcon from 'react-icons/bs';
import '../assets/styles/u5_seatStatusForm.css';

//좌석 예약 페이지->좌석 도면, 사용현황, 층

const SeatStatusForm = () => {
  //const button = React.createRef();
  const [isToggleOn, setIsToggleOn] = useState(1);
  const [floor, setFloor] = useState([]);
  const [floorName, setFloorName] = useState('1층');
  //특정 층의 좌석 도면을 가져오도록 수정해야함
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/floors`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setFloor(json);
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
  const changeFloorText = floorName => {
    setFloorName(floorName);
  };
  console.log(floor);
  return (
    <div className="seatForm">
      <div className="u_seatFormUpper">
        {/*층 이름, 시설 아이콘, 좌석 현황 */}
        <div className="selectedFloorName">
          <div className="selectedFloorNameTextStyle">{floorName}</div>

          <Dropdown className="dropdownFloor">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              층을 선택하세요.
            </Dropdown.Toggle>

            <Dropdown.Menu defaultValue="3층">
              {floor.map(item => (
                <Dropdown.Item onClick={() => changeFloorText(item.name)}>
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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
        <div className="seatLayout">
          {isToggleOn ? '좌석도면' : <FacilityForm />}
        </div>
      </div>
    </div>
  );
};

export default SeatStatusForm;
