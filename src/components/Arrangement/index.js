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
    </div>
  );
};
