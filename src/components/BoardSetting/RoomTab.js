import React, { useState } from 'react';
import * as bs from 'react-icons/bs';
import * as io from 'react-icons/io';

import { EDIT_SELECTION } from '../../const/selection-type.const';
import './BoardSetting.css';

export const RoomTab = ({ selection, floor, rooms, setRooms }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);

  const inputName = e => {
    setName(e.target.value);
  };
  const inputNumber = e => {
    setNumber(Number(e.target.value));
  };

  const handleSave = () => {
    const createRoom = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/rooms`,
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
            maxUser: number,
          }),
        },
      );

      if (response.status === 201) {
        alert('회의실이 생성되었습니다.');
        const json = await response.json();
        setRooms([...rooms, json]);
      }
    };

    createRoom();
  };

  const handleDelete = () => {
    const deleteRoom = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/rooms/${selection.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/text',
          },
        },
      );

      if (response.status === 200) {
        alert('회의실이 삭제되었습니다.');
        const json = await response.json();
        setRooms(rooms.filter(room => room.id !== json.id));
      }
    };

    deleteRoom();
  };

  return (
    <div className="seat-tab">
      {selection.stage !== EDIT_SELECTION && (
        <p className="text-notification">
          회의실 생성 시, <bs.BsCheckAll style={{ color: '#c00000' }} />는{' '}
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
        회의실 위치
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
      <label style={{ marginTop: '5%' }}>
        <bs.BsCheckAll style={{ color: 'transparent' }} />
        회의실 크기
      </label>
      <div style={{ marginLeft: '15%' }}>
        <label>
          가로 :{'  '}
          <input
            value={selection.width}
            className="seat-input-location"
            disabled
          />{' '}
          ,
        </label>
        <label style={{ marginLeft: '5%' }}>
          세로 :{'  '}
          <input
            value={selection.height}
            className="seat-input-location"
            disabled
          />
        </label>
      </div>

      {selection.stage !== EDIT_SELECTION && (
        <>
          <label style={{ marginTop: '5%' }}>
            <bs.BsCheckAll style={{ color: '#c00000' }} />
            회의실 이름 :{'     '}
            <input
              className="seat-input-name"
              value={name}
              placeholder="입력해 주세요."
              onChange={e => {
                inputName(e);
              }}
              disabled={
                selection.width <= 1 && selection.height <= 1 ? true : false
              }
            />
          </label>
          <label style={{ marginTop: '5%' }}>
            <bs.BsCheckAll style={{ color: '#c00000' }} />
            회의실 최대 인원 수 :{'     '}
            <input
              className="room-input-maxuser"
              value={number}
              onChange={e => {
                inputNumber(e);
              }}
              disabled={
                selection.width <= 1 && selection.height <= 1 ? true : false
              }
            />
          </label>
          <button
            className="seat-btn-make"
            onClick={() => {
              handleSave();
            }}
            disabled={name !== '' && number !== 0 ? false : true}
          >
            생성하기
          </button>
        </>
      )}

      {selection.stage === EDIT_SELECTION && (
        <>
          <label style={{ marginTop: '5%' }}>
            <bs.BsCheckAll style={{ color: 'transparent' }} />
            회의실 이름 :{'     '}
            <input
              className="seat-input-name-show"
              value={selection.name}
              placeholder="입력해 주세요."
              onChange={e => {
                inputName(e);
              }}
              disabled
            />
          </label>
          <label style={{ marginTop: '5%' }}>
            <bs.BsCheckAll style={{ color: 'transparent' }} />
            회의실 최대 인원 수 :{'     '}
            <input
              className="room-input-maxuser-show"
              value={selection.maxUser}
              onChange={e => {
                inputNumber(e);
              }}
              disabled
            />
          </label>
          <button
            className="seat-btn-make"
            onClick={() => {
              handleDelete();
            }}
          >
            삭제하기
          </button>
        </>
      )}
    </div>
  );
};
