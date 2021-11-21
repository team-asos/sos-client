import React, { useState } from 'react';

import { EDIT_SELECTION } from '../../const/selection-type.const';

export const SeatTab = ({ selection, floor, seats, setSeats }) => {
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
            floorId: floor.id,
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
      <label>X</label>
      <input value={selection.x} disabled />
      <label>Y</label>
      <input value={selection.y} disabled />
      <label>좌석 이름</label>

      {selection.stage !== EDIT_SELECTION && (
        <>
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
        </>
      )}
      {selection.stage === EDIT_SELECTION && (
        <>
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
