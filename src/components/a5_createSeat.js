import React, { useState, useEffect } from 'react';

const CreateSeat = props => {
  const [name, setName] = useState('');

  const createClickHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/seats`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          //name, x, y, width, height, floorId
          name,
          width: Number(1),
          height: Number(1),
          x: Number(props.clickedColumn),
          y: Number(props.clickedRow),
          floorId: Number(props.floorInfo.id),
        }),
      },
    );
    if (result.status === 201) {
      alert('좌석이 생성되었습니다.');
    }
  };

  return (
    <div className="tabContent">
      <p>
        좌석 위치 : ( {props.clickedColumn + 1},{props.clickedRow + 1} )
      </p>
      <p>
        좌석 번호 :{' '}
        <input
          type="text"
          placeholder="숫자로 입력하세요."
          onChange={e => setName(e.target.value)}
        />
      </p>
      <button className="addBtn" onClick={createClickHandler}>
        추가하기
      </button>
    </div>
  );
};

export default CreateSeat;
