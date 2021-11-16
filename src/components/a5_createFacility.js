import React, { useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { red } from '@mui/material/colors';

const CreateFacility = ({ clickedColumn, clickedRow, floorInfo }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleChange = event => {
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
          //name, x, y, width, height, floorId, maxUser
          name,
          type,
          width: Number(2),
          height: Number(2),
          x: Number(clickedRow),
          y: Number(clickedColumn),
          floorId: Number(floorInfo.id),
        }),
      },
    );
    if (result.status === 201) {
      alert('회의실이 생성되었습니다.');
    }
  };

  const controlProps = item => ({
    checked: type === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div className="tabContent">
      <p>
        시설 위치 : ( {clickedRow + 1},{clickedColumn + 1} )
      </p>
      <FormControl
        component="fieldset"
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <p>시설 타입</p>

        <RadioGroup
          value={type}
          onChange={handleChange}
          sx={{ ml: 2, mt: -1, display: 'flex', flexDirection: 'column' }}
        >
          <FormControlLabel
            value="air_conditioner"
            control={
              <Radio
                size="small"
                {...controlProps('air_conditioner')}
                sx={{
                  '&.Mui-checked': {
                    color: red[900],
                  },
                }}
              />
            }
            label="에어컨"
          />
          <FormControlLabel
            value="elevator"
            control={
              <Radio
                size="small"
                {...controlProps('elevator')}
                sx={{
                  '&.Mui-checked': {
                    color: red[900],
                  },
                }}
              />
            }
            label="엘레베이터"
          />
          <FormControlLabel
            value="restroom"
            control={
              <Radio
                size="small"
                {...controlProps('restroom')}
                sx={{
                  '&.Mui-checked': {
                    color: red[900],
                  },
                }}
              />
            }
            label="화장실"
          />
        </RadioGroup>
      </FormControl>
      <button className="addBtn" onClick={createClickHandler}>
        추가하기
      </button>
    </div>
  );
};

export default CreateFacility;
