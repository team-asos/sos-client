import React, { useEffect, useState } from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

import '../assets/styles/a5_seatManageBox.css';
import SeatBoard from './a5_seatBoard';

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

  //층 생성하기
  const [name, setName] = useState('');

  const newFloorHandler = async () => {
    console.log('hello'); //안됨. 버튼에 무슨 문제가 있나요?
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/floors`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name,
        }),
      },
    );
    if (result.status === 201) {
      console.log('completed!');
      window.location.href = '/seat-management';
    }
  };

  const inputName = e => {
    setName(e.target.value);
  };

  //층 생성 모달창 관련 변수 정의
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="seatManageBox">
      {/* 위, 텍스트 부분 */}
      <div className="seatManageUpperBox">
        <div className="seatManageUpperFirstChild">좌석 관리</div>
        <div className="seatManageUpperSecondChild">
          <Dropdown
            className="selectFloor"
            options={floor.map((item, idx) => item.name)}
            placeholder="층을 선택하세요."
          />
        </div>
        <div className="seatManageUpperLastChild">
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Tooltip
                id="tooltip-right"
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                <strong>층</strong>을 생성하고 싶으면 클릭하세요
              </Tooltip>
            }
          >
            <button onClick={handleShow}>+</button>
          </OverlayTrigger>
        </div>
      </div>
      {/* 아래,  부분 */}
      <div className="seatManageBottomBox">
        <SeatBoard />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>새로운 층 생성하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          층 이름 : {'   '}
          <input
            className="floorInputForm"
            type="text"
            placeholder="(숫자+층)으로 입력해주세요."
            onChange={inputName}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={newFloorHandler}
            style={{
              backgroundColor: '#c00000',
              color: 'white',
              border: 'none',
            }}
          >
            생성하기
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SeatManageBox;
