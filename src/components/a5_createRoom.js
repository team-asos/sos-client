import React, { useState } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const CreateRoom = props => {
  const [maxUser, setMaxUser] = useState('');
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const createClickHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/rooms`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          //name, x, y, width, height, floorId, maxUser
          name,
          width: Number(width),
          height: Number(height),
          x: Number(props.clickedRow),
          y: Number(props.clickedColumn),
          floorId: Number(props.floorInfo.id),
          maxUser: Number(maxUser),
        }),
      },
    );
    if (result.status === 201) {
      alert('회의실이 생성되었습니다.');
    }
  };

  return (
    <div className="tabContent">
      <p>
        회의실 위치 : ( {props.clickedColumn + 1},{props.clickedRow + 1} )
      </p>
      <p>
        회의실 번호 :{' '}
        <input
          type="text"
          placeholder="숫자로 입력하세요."
          style={{ width: '11vw' }}
          onChange={e => setName(e.target.value)}
        />
      </p>
      <p>
        회의실 크기 :{' '}
        <input
          type="text"
          placeholder="가로"
          style={{ width: '4vw' }}
          onChange={e => setHeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="세로"
          style={{ width: '4vw', marginLeft: '1.5%' }}
          onChange={e => setWidth(e.target.value)}
        />
      </p>
      <p>
        회의실 인원 수 :
        <input
          type="text"
          placeholder="최대 인원수"
          style={{ width: '6vw', marginLeft: '1.5%' }}
          onChange={e => setMaxUser(e.target.value)}
        />
      </p>
      <button className="addBtn" onClick={createClickHandler}>
        추가하기
      </button>
    </div>
  );
};

export default CreateRoom;
