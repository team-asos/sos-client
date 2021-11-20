import React, { useEffect, useState } from 'react';

import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { BoardContainer } from '../BoardContainer/index';
import { FloorModal } from '../FloorModal/index';

import './index.scss';

export const Arrangement = () => {
  const [floors, setFloors] = useState([]);
  const [selectFloor, setSelectFloor] = useState([]);

  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

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
    <div className="arrangement-container">
      <div className="header">
        <div className="header-title">
          <p>배치 관리</p>
        </div>
        <div className="header-floor">
          <FormControl fullWidth>
            <InputLabel id="floor-select-label">선택</InputLabel>
            <Select
              labelid="floor-select-label"
              value={selectFloor}
              label="선택"
              onChange={e => {
                setSelectFloor(e.target.value);
              }}
            >
              {floors.map(floor => (
                <MenuItem value={floor} key={floor.id}>
                  {floor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="header-tooltip">
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                층 <strong>생성</strong> 또는 <strong>삭제</strong>를 원하시면
                클릭하세요.
              </Tooltip>
            }
          >
            <button
              onClick={() => {
                toggleModal();
              }}
            >
              ···
            </button>
          </OverlayTrigger>
        </div>
      </div>
      <div className="content">
        <BoardContainer floor={selectFloor} />
      </div>

      <FloorModal show={show} toggleModal={toggleModal} />

      {/* <div className="seatManageUpperBox">
        <div className="seatManageUpperFirstChild">좌석 관리</div>

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
      </div> */}

      {/* <FloorModal show={show} handleClose={handleClose} /> */}
    </div>
  );
};
