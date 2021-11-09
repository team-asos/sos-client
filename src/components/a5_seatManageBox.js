import React, { useEffect, useState } from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

import '../assets/styles/a5_seatManageBox.css';
import SeatBoard from './a5_seatBoard';
import set from 'date-fns/esm/set/index';

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
  //안됨 이유? 모름
  const [name, setName] = useState('');
  const [width, setwidth] = useState('');
  const [height, setheight] = useState('');

  const registerClickHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/floors`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name,
          width,
          height,
        }),
      },
    );
    window.location.href = '/seat-management';
  };

  const inputName = e => {
    setName(e.target.value);
  };
  const inputWidth = e => {
    setwidth(e.target.value);
  };
  const inputHeight = e => {
    setheight(e.target.value);
  };

  //층 생성 모달창 관련 변수 정의
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="seatManageBox">
      <div className="seatManageUpperBox">
        {/* 위, 텍스트 부분 */}
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
          <div>
            층 이름 : {'   '}
            <input
              className="floorInputForm"
              type="text"
              placeholder="(숫자+층)으로 입력해주세요. 예) 1층"
              onChange={inputName}
              style={{ width: '20vw', marginTop: '2%' }}
            />
          </div>
          <div>
            층의 가로 길이 :{' '}
            <input
              className="floorInputForm"
              type="text"
              placeholder="숫자로 입력해주세요. 예) 30"
              onChange={inputWidth}
              style={{ width: '20vw', marginTop: '2%' }}
            />
          </div>
          <div>
            층의 세로 길이 :{' '}
            <input
              className="floorInputForm"
              type="text"
              placeholder="숫자로 입력해주세요. 예) 30"
              onChange={inputHeight}
              style={{ width: '20vw', marginTop: '2%' }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={registerClickHandler}
            style={{
              backgroundColor: '#c00000',
              color: 'white',
              border: 'none',
              borderRadius: '2px',
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
