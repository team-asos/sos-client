import React, { useEffect, useState } from 'react';

import 'react-dropdown/style.css';
import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';

import '../assets/styles/a5_seatManageBox.css';
import SeatBoard from './a5_seatBoard';
import FloorModal from './a5_floorModal';

const SeatManageBox = () => {
  //층 불러오기
  const [floor, setFloor] = useState([]);
  useEffect(() => {
    const asd = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/floors`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setFloor(json);
        });
    };
    asd();
  }, []);

  //층 생성 모달창 관련 변수 정의
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="seatManageBox">
      <div className="seatManageUpperBox">
        {/* 위, 텍스트 부분 */}
        <div className="seatManageUpperFirstChild">좌석 관리</div>

        {/* 층 선택 */}
        <div className="seatManageUpperSecondChild">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              층을 선택하세요.
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {floor.map(item => (
                <Dropdown.Item>{item.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* 층 추가 */}
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

      {/* 아래 도면 부분 */}
      <div className="seatManageBottomBox">
        <SeatBoard />
      </div>

      {/* 층 생성 모달창 : 추후에 분리할 예정 */}
      <FloorModal show={show} handleClose={handleClose} />
    </div>
  );
};

export default SeatManageBox;
