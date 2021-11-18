import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import FacilityForm from '../components/u5_facilityForm';
import SeatForm from '../components/u5_seatForm';
import * as BsIcon from 'react-icons/bs';
import '../assets/styles/u5_seatStatusForm.css';

//좌석 예약 페이지->좌석 도면, 사용현황, 층

const SeatStatusForm = props => {
  //const button = React.createRef();
  const [isToggleOn, setIsToggleOn] = useState(1);
  const [floor, setFloor] = useState([]);
  const [seat, setSeat] = useState([]);
  const [room, setRoom] = useState([]);
  const [facility, setFacility] = useState([]);
  const [floorName, setFloorName] = useState('1층');
  const [floorInfo, setFloorInfo] = useState(1);
  //특정 층의 좌석 도면을 가져오도록 수정해야함
  //층 조회
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
  //좌석 조회
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/seats`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setSeat(json);
        });
    };
    res();
  }, []);
  //회의실 조회
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/rooms`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setSeat(json);
        });
    };
    res();
  }, []);
  console.log(seat);
  console.log(room);

  const handleClick = e => {
    setIsToggleOn(!isToggleOn);
    isToggleOn
      ? (e.target.style.color = '#820101')
      : (e.target.style.color = 'black');
  };
  const changeFloorText = floor => {
    setFloorName(floor.name);
    setFloorInfo(floor);
    console.log(floorInfo);
  };
  return (
    <div className="seatForm">
      <div className="u_seatFormUpper">
        {/*층 이름, 시설 아이콘, 좌석 현황 */}
        <div className="selectedFloorName">
          <div className="selectedFloorNameTextStyle">{floorName}</div>

          <Dropdown className="dropdownFloor">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {floorName}
            </Dropdown.Toggle>

            <Dropdown.Menu defaultValue="3층">
              {floor.map(item => (
                <Dropdown.Item onClick={() => changeFloorText(item)}>
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <p className="u5textStyle">층을 선택하세요.</p>
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
        {isToggleOn ? <SeatForm floorInfo={floorInfo} /> : <FacilityForm />}
      </div>
    </div>
  );
};

export default SeatStatusForm;
