import React, { useEffect, useState } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { red } from '@mui/material/colors';

const CreateFacility = props => {
  const [type, setType] = useState('');
  const facility_Type = [
    {
      name: '에어컨',
      engName: 'air',
    },
    {
      name: '선풍기',
      engName: 'pan',
    },
    {
      name: '화장실',
      engName: 'toilet',
    },
    {
      name: '문',
      engName: 'door',
    },
    {
      name: '엘레베이터',
      engName: 'elevator',
    },
    {
      name: '비상계단',
      engName: 'stair',
    },
  ];

  const inputType = event => {
    setType(event.target.value);
  };

  const createClickHandler = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/facilities`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          //type, x, y, width, height, floorId
          type,
          width: Number(2),
          height: Number(2),
          x: Number(props.clickedColumn),
          y: Number(props.clickedRow),
          floorId: Number(props.floorInfo.id),
        }),
      },
    );
    if (result.status === 201) {
      alert('시설이 생성되었습니다.');
    }
  };

  return (
    <div className="tabContent">
      <div>
        <p>
          시설 위치 : ( {props.clickedColumn + 1},{props.clickedRow + 1} )
        </p>
        <p>
          시설 타입 :
          <span>
            <FormControl
              variant="standard"
              sx={{ ml: 1, mt: -0.5, width: '6vw' }}
            >
              <Select value={type} onChange={inputType}>
                {facility_Type.map(item => (
                  <MenuItem value={item.engName}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </span>
        </p>
        <button className="addBtn" onClick={createClickHandler}>
          추가하기
        </button>
      </div>
    </div>
  );
};

export default CreateFacility;
