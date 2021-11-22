import React, { useEffect, useState } from 'react';

import 'react-dropdown/style.css';
import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';

import '../assets/styles/a5_seatManageBox.css';
import FloorModal from './a5_floorModal';

import { BoardContainer } from './a5_BoardContainer';

const SeatManageBox = () => {
  //층 불러오기
  const [floor, setFloor] = useState([]);

  useEffect(() => {
    const fetchFloors = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/floors`,
        {
          method: 'GET',
        },
      );
      setFloor(await result.json());
    };
    fetchFloors();
  }, []);

  //층 선택
  const [selectFloor, setSelectFloor] = useState([]);

  const handleChange = event => {
    console.log(event.target.value);
    setSelectFloor(event.target.value);
  };

  //층 생성 모달창 관련 변수 정의
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    //.arrangement-container
    <div className="seatManageBox">
      {/* .header */}
      <div className="seatManageUpperBox">
        {/* .header-title // 위, 텍스트 부분 */}
        <div className="seatManageUpperFirstChild">배치 관리</div>

        {/* .header-floor // 층 선택 */}
        <div className="seatManageUpperSecondChild">
          {/* 여기에 select 다시 작성하기 */}
          {/* <div>
            <label>층을 선택해주세요:</label>
            <select className="form-control" name="floor">

              {floor.map(floor => (
                <option onClick={e => setSelectFloor(floor), console.log}>
                  {floor.name}
                </option>
              ))}
            </select>
          </div> */}
          <p style={{ fontSize: '0.75em' }}>층을 선택해주세요.</p>
          <Dropdown className="dropdownFloor">
            <Dropdown.Toggle id="dropdown-basic" variant="secondary">
              {selectFloor.length === 0 ? '층 선택' : selectFloor.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>층 선택</Dropdown.Item>
              {floor.map(floor => (
                <Dropdown.Item
                  onClick={e => {
                    setSelectFloor(floor);
                  }}
                >
                  {floor.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* .header-tooltip // 층 추가 */}
        <div className="seatManageUpperLastChild">
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Tooltip
                id="tooltip-right"
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                층 <strong style={{ color: '#ce0303' }}>생성</strong> 또는{' '}
                <strong style={{ color: '#ce0303' }}>삭제</strong>를 원하시면
                <br />
                클릭하세요
              </Tooltip>
            }
          >
            <button onClick={handleShow}>···</button>
          </OverlayTrigger>
        </div>
      </div>

      {/* .content // 아래 도면 부분 */}
      <div className="seatManageBottomBox">
        {/* <SeatBoard /> */}
        <BoardContainer floor={selectFloor} />
      </div>

      {/* 층 생성 모달창 : 추후에 분리할 예정 */}
      <FloorModal show={show} handleClose={handleClose} />
    </div>
  );
};

export default SeatManageBox;
