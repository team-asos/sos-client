import React, { useState } from 'react';

export const SeatTab = ({ selection }) => {
  const [name, setName] = useState('');

  const inputName = e => {
    setName(e.target.value);
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
            floorId: 1,
          }),
        },
      );

      if (response.status === 201) {
        alert('성공');
      }
    };

    createSeat();
  };

  return (
    <div className="seat-tab">
      <label>X</label>
      <input value={selection.x} disabled />
      <label>Y</label>
      <input value={selection.y} disabled />

      <label>좌석 이름</label>
      <input
        value={name}
        onChange={e => {
          inputName(e);
        }}
        disabled={selection.x === -1 ? true : false}
      />
      <button
        onClick={() => {
          handleSave();
        }}
        disabled={name === '' ? true : false}
      >
        생성하기
      </button>
    </div>
  );
};