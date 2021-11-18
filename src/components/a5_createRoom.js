import React, { useState } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const CreateRoom = props => {
  const [maxUser, setMaxUser] = useState('');
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const maxUserList = [4, 5, 6, 8, 10, 12];

  const inputMaxUser = e => {
    setMaxUser(e.target.value);
  };

  const createClickHandler = async () => {
    console.log(maxUser);
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
          x: Number(props.clickedColumn),
          y: Number(props.clickedRow),
          floorId: Number(props.floorInfo.id),
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
          onChange={e => setWidth(e.target.value)}
        />
        <input
          type="text"
          placeholder="세로"
          style={{ width: '4vw', marginLeft: '1.5%' }}
          onChange={e => setHeight(e.target.value)}
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
