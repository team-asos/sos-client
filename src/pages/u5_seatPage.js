import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBarUser from '../components/u_navBar';
import { useCookies } from 'react-cookie';
import { Dropdown } from 'react-bootstrap';
import { BoardContainer } from '../components/u5_boardContainer';
import * as BsIcon from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import MobileNavBar from '../components/u_m_navBar';
import '../assets/styles/u5_seatPage.css';
//좌석 예약 페이지
const SeatPage = () => {
  const [open, setOpen] = useState(false);
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const navClick = () => {
    setOpen(!open);
  };
  const [myId, setMyId] = useState();
  const [cookie] = useCookies(['access_token']);
  const [isToggleOn, setIsToggleOn] = useState(0);
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState([]);
  const [reservedSeatsCnt, setReservedSeatsCnt] = useState(0);
  const [seatsCnt, setSeatsCnt] = useState(0);
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

      setFloors(await result.json());
    };

    fetchFloors();
  }, []);

  const getReservedSeatsCnt = cnt => {
    setReservedSeatsCnt(cnt);
  };
  const getSeatsCnt = cnt => {
    setSeatsCnt(cnt);
  };
  useEffect(() => {
    setReservedSeatsCnt(0);
  }, [selectedFloor]);

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
          {/*층 이름, 시설 아이콘, 좌석 현황 */}
          <div className="u_selectFloor">
            <Dropdown className="u_dropdownFloor">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedFloor.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {floors.map(floor => (
                  <Dropdown.Item
                    key={floor.id}
                    onClick={e => {
                      setSelectedFloor(floor);
                    }}
                  >
                    {floor.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {isPc && <p className="selectFloorTextStyle">층을 선택하세요.</p>}
          </div>

          <div className={isPc ? 'statusForm' : 'm_statusForm'}>
            <div className="showFacility">
              {/*시설 아이콘*/}
              <BsIcon.BsFillInfoCircleFill
                className={isPc ? 'facilityicon' : 'm_facilityIcon'}
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
              ></BsIcon.BsFillInfoCircleFill>
            </div>
            {/*좌석 현황*/}
            <div className="reservedSeats">
              <div
                className={isPc ? 'reservedSeatShape' : 'm_reservedSeatShape'}
              ></div>
              <div
                className={
                  isPc ? 'reservedSeatsTextStyle' : 'm_reservedSeatsTextStyle'
                }
              >
                사용 중 {reservedSeatsCnt}석
              </div>
            </div>
            <div className="ableSeats">
              <div className={isPc ? 'ableSeatShape' : 'm_ableSeatShape'}></div>
              <div
                className={isPc ? 'ableSeatsTextStyle' : 'm_ableSeatsTextStyle'}
              >
                예약 가능 {seatsCnt - reservedSeatsCnt}석
              </div>
            </div>
          </div>
        </div>
        <div className={isPc ? 'seatContent' : 'm_seatContent'}>
          <BoardContainer
            floor={selectedFloor}
            userId={myId}
            getSeatsCnt={getSeatsCnt}
            getReservedSeatsCnt={getReservedSeatsCnt}
            isToggleOn={isToggleOn}
          />
        </div>
      </div>
    </div>
  );
};
export default SeatPage;
