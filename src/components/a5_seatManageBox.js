import React, { useEffect, useState } from 'react';

import 'react-dropdown/style.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import '../assets/styles/a5_seatManageBox.css';
import FloorModal from './a5_floorModal';
import {
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { Board } from './Board';

const SeatManageBox = () => {
  //층 불러오기
  const [floors, setFloors] = useState([]);

  //층 선택
  const [selectFloor, setSelectFloor] = useState([]);

  //층 생성 모달창 관련 변수 정의
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <div className="seatManageBox">
      <div className="seatManageUpperBox">
        {/* 위, 텍스트 부분 */}
        <div className="seatManageUpperFirstChild">좌석 관리</div>

        {/* 층 선택 */}
        <div className="seatManageUpperSecondChild">
          <FormControl sx={{ m: 4, minWidth: 150 }}>
            <FormHelperText>층을 선택하세요.</FormHelperText>
            <Select
              value={selectFloor}
              onChange={e => {
                setSelectFloor(e.target.value);
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>선택</em>
              </MenuItem>
              {floors.map(item => (
                <MenuItem value={item} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

      {/* 도면 */}
      <div className="seatManageBottomBox">
        <Board floor={selectFloor} />
      </div>

      {/* 층 생성 모달창 : 추후에 분리할 예정 */}
      <FloorModal show={show} handleClose={handleClose} />
    </div>
  );
};

export default SeatManageBox;
