import React, { useState } from 'react';
import * as bs from 'react-icons/bs';
import * as io from 'react-icons/io';

import { EDIT_SELECTION } from '../../const/selection-type.const';
import './BoardSetting.css';

export const SeatTab = ({ selection, floor, seats, setSeats }) => {
  const [name, setName] = useState('');
  const [tag, setTag] = useState(0);

  const inputName = e => {
    setName(e.target.value);
  };

  const inputTag = e => {
    setTag(e.target.value);
  };

  const handleSave = () => {
    const createSeat = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/seats`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/text',
          },
          body: JSON.stringify({
            name,
            x: selection.x,
            y: selection.y,
            width: selection.width,
            height: selection.height,
            floorId: floor.id,
            tagId: Number(tag),
          }),
        },
      );

      if (response.status === 201) {
        alert('좌석이 생성되었습니다.');
        const json = await response.json();
        setSeats([...seats, json]);
      }
    };

    createSeat();
  };

  const handleDelete = () => {
    const deleteSeat = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/seats/${selection.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/text',
          },
        },
      );

      if (response.status === 200) {
        alert('좌석이 삭제되었습니다.');
        const json = await response.json();
        setSeats(seats.filter(seat => seat.id !== json.id));
      }
    };

    deleteSeat();
  };

  return (
    <div className="seat-tab">
      {selection.stage !== EDIT_SELECTION && (
        <p className="text-notification">
          좌석 생성 시, <bs.BsCheckAll style={{ color: '#c00000' }} />는{' '}
          <span className="text-notification-strong">필수 입력칸</span> 입니다.
          <br />
          도면의 흰색 부분 선택 시, 생성이 종료됩니다.
        </p>
      )}
      {selection.stage === EDIT_SELECTION && (
        <p className="text-notification">
          <io.IoIosNotifications size={18} style={{ color: '#c00000' }} />{' '}
          도면의 흰색 부분 선택 시, <br />
          조회가 종료됩니다.
        </p>
      )}

      <label>
        <bs.BsCheckAll style={{ color: 'transparent' }} />
        좌석 위치
      </label>
      <div style={{ marginLeft: '15%' }}>
        <label>
          X :{'  '}
          <input
            value={selection.x}
            className="seat-input-location"
            disabled
          />{' '}
          ,
        </label>
        <label style={{ marginLeft: '5%' }}>
          Y :{'  '}
          <input value={selection.y} className="seat-input-location" disabled />
        </label>
      </div>

      {selection.stage !== EDIT_SELECTION && (
        <div>
          <label style={{ marginTop: '10%' }}>
            <bs.BsCheckAll style={{ color: '#c00000' }} />
            좌석 이름 :
            <input
              className="seat-input-name"
              value={name}
              placeholder="입력해 주세요."
              onChange={e => {
                inputName(e);
              }}
              disabled={selection.x === -1 ? true : false}
            />
          </label>
          <label style={{ marginTop: '8%' }}>
            <bs.BsCheckAll style={{ color: '#c00000' }} />
            ESL 아이디 :
            <input
              className="seat-input-name"
              value={tag}
              placeholder="입력해 주세요."
              onChange={e => {
                inputTag(e);
              }}
              disabled={selection.x === -1 ? true : false}
            />
          </label>
          <button
            className="seat-btn-make"
            onClick={() => {
              handleSave();
            }}
            disabled={name === '' ? true : false}
          >
            생성하기
          </button>
        </div>
      )}
      {selection.stage === EDIT_SELECTION && (
        <label style={{ marginTop: '10%' }}>
          <bs.BsCheckAll style={{ color: 'transparent' }} />
          좌석 이름 :{'     '}
          <input
            className="seat-input-name-show"
            value={selection.name}
            disabled
          />
          <button
            className="seat-btn-make"
            onClick={() => {
              handleDelete();
            }}
          >
            삭제하기
          </button>
        </label>
      )}
    </div>
  );
};
