import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Dropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import * as BsIcon from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';

import { BoardContainer } from '../components/u5_boardContainer';
import MobileNavBar from '../components/u_m_navBar';
import NavBarUser from '../components/u_navBar';

import '../assets/styles/u5_seatPage.css';

//좌석 예약 페이지
const SeatPage = () => {
  const [open, setOpen] = useState(false);
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const navClick = () => {
    setOpen(!open);
  };
  const [myId, setMyId] = useState();
  const [cookie] = useCookies(['access_token']);
  const [isToggleOn, setIsToggleOn] = useState(0);
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState([]);

  const [seatCount, setSeatCount] = useState(0);
  const [usedSeatCount, setUsedSeatCount] = useState(0);

  const handleClick = e => {
    setIsToggleOn(!isToggleOn);
    !isToggleOn
      ? (e.target.style.color = '#820101')
      : (e.target.style.color = 'black');
  };

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

  //전체 층 조회
  useEffect(() => {
    const fetchFloors = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/floors`,
        {
          method: 'GET',
        },
      );

      const json = await result.json();

      setFloors(json);
    };

    fetchFloors();
  }, []);

  return (
    <div className="userSeatPage">
      <div>{isPc ? <NavBarUser /> : null}</div>

      <div className={isPc ? 'userSeatForm' : 'm_userSeatForm'}>
        {isPc ? null : (
          <div className="m_u_seatHeader">
            <div>
              <FiMenu
                size={30}
                onClick={navClick}
                style={{
                  color: 'firebrick',
                  marginLeft: '10px',
                  marginTop: '-4px',
                }}
              />
            </div>
            <div className="m_u_seatHeaderTextStyle">좌석 예약</div>
          </div>
        )}

        {open ? <MobileNavBar open={open} /> : null}

        <div className="u_seatFormUpper">
          <div className="u_selectFloor">
            <Dropdown className="u_dropdownFloor">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedFloor.length === 0 && floors[0]
                  ? floors[0].name
                  : selectedFloor.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {floors.map(floor => (
                  <Dropdown.Item
                    key={floor.id}
                    onClick={() => {
                      setSelectedFloor(floor);
                    }}
                  >
                    {floor.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className={isPc ? 'statusForm' : 'm_statusForm'}>
            <div className="showFacility">
              <BsIcon.BsFillInfoCircleFill
                className={isPc ? 'facilityicon' : 'm_facilityIcon'}
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
              ></BsIcon.BsFillInfoCircleFill>
            </div>
            {isPc ? (
              <>
                <div className="reservedSeats">
                  <div className="reservedSeatShape"></div>
                  <div className="reservedSeatsTextStyle">
                    사용 중 {usedSeatCount}석
                  </div>
                </div>
                <div className="ableSeats">
                  <div className="ableSeatShape"></div>
                  <div className="ableSeatsTextStyle">
                    예약 가능 {seatCount - usedSeatCount}석
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="reservedSeats">
                  <div className="m_reservedSeatShape"></div>
                  <div className="m_reservedSeatsTextStyle">
                    사용 중<br></br> {usedSeatCount}석
                  </div>
                </div>
                <div className="ableSeats">
                  <div className="m_ableSeatShape"></div>
                  <div className="m_ableSeatsTextStyle">
                    예약 가능 <br></br>
                    {seatCount - usedSeatCount}석
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={isPc ? 'seatContent' : 'm_seatContent'}>
          {selectedFloor.length === 0 && floors[0] ? (
            <>
              <BoardContainer
                floor={floors[0]}
                userId={myId}
                isToggleOn={isToggleOn}
                setSeatCount={setSeatCount}
                setUsedSeatCount={setUsedSeatCount}
              />
            </>
          ) : (
            <>
              <BoardContainer
                floor={selectedFloor}
                userId={myId}
                isToggleOn={isToggleOn}
                setSeatCount={setSeatCount}
                setUsedSeatCount={setUsedSeatCount}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SeatPage;
