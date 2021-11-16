import React, { useState } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const CreateRoom = ({ clickedColumn, clickedRow, floorInfo }) => {
  const [maxUser, setMaxUser] = useState('');
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const maxUserList = [4, 5, 6, 8, 10, 12];
  const inputMaxUser = e => {
    setMaxUser(e.target.value);
    setWidth(2);
    setHeight(Math.ceil(e.target.value / 2));
    console.log(maxUser, width, height);
  };
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
          width,
          height,
          x: Number(clickedRow),
          y: Number(clickedColumn),
          floorId: Number(floorInfo.id),
          maxUser,
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
        회의실 위치 : ( {clickedRow + 1},{clickedColumn + 1} )
      </p>
      <p>
        회의실 번호 :{' '}
        <input
          type="text"
          placeholder="숫자로 입력하세요."
          onChange={e => setName(e.target.value)}
        />
      </p>
      <p>
        회의실 인원 수 :
        <span>
          <FormControl
            variant="standard"
            sx={{ ml: 1, mt: -0.5, width: '4vw' }}
          >
            <Select value={maxUser} onChange={inputMaxUser}>
              {maxUserList.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </span>
      </p>
      <button className="addBtn" onClick={createClickHandler}>
        추가하기
      </button>
    </div>
  );
};

export default CreateRoom;
