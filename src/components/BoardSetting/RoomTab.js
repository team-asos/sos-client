import React, { useState } from 'react';

export const RoomTab = ({ selection, floor }) => {
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
        alert('성공');
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
        alert('성공');
      }
    };

    deleteRoom();
  };

  return (
    <div className="seat-tab">
      <label>X</label>
      <input value={selection.x} disabled />
      <label>Y</label>
      <input value={selection.y} disabled />
      <label>WIDTH</label>
      <input value={selection.width} disabled />
      <label>HEIGHT</label>
      <input value={selection.height} disabled />

      {selection.stage !== 3 && (
        <>
          <label>회의실 이름</label>
          <input
            value={name}
            onChange={e => {
              inputName(e);
            }}
            disabled={selection.width === 0 ? true : false}
          />
          <label>회의실 최대 인원 수</label>
          <input
            value={number}
            onChange={e => {
              inputNumber(e);
            }}
            disabled={selection.width === 0 ? true : false}
          />
          <button
            onClick={() => {
              handleSave();
            }}
            disabled={name !== '' && number !== 0 ? false : true}
          >
            생성하기
          </button>
        </>
      )}
      {selection.stage === 3 && (
        <>
          <label>회의실 이름</label>
          <input value={selection.name} disabled />
          <button
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
