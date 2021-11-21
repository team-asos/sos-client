import React, { useState } from 'react';

import { EDIT_SELECTION } from '../../const/selection-type.const';

import { FormControl, Select, MenuItem } from '@mui/material';

export const FacilityTab = ({
  selection,
  floor,
  facilities,
  setFacilities,
}) => {
  const [type, setType] = useState('');

  const facilitiesList = [
    {
      name: '에어컨',
      engName: 'airconditional',
    },
    {
      name: '선풍기',
      engName: 'fan',
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

  const handleSave = () => {
    const createFacility = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/facilities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/text',
          },
          body: JSON.stringify({
            type,
            x: selection.x,
            y: selection.y,
            width: selection.width,
            height: selection.height,
            floorId: floor.id,
          }),
        },
      );

      if (response.status === 201) {
        alert('시설이 생성되었습니다.');
        const json = await response.json();
        setFacilities([...facilities, json]);
      }
    };

    createFacility();
  };

  const handleDelete = () => {
    const deleteFacility = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/facilities/${selection.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/text',
          },
        },
      );

      if (response.status === 200) {
        alert('시설이 삭제되었습니다.');
        const json = await response.json();
        setFacilities(facilities.filter(facility => facility.id !== json.id));
      }
    };

    deleteFacility();
  };

  return (
    <div className="seat-tab">
      <label>X</label>
      <input value={selection.x} disabled />
      <label>Y</label>
      <input value={selection.y} disabled />
      <label>시설 타입</label>

      {selection.stage !== EDIT_SELECTION && (
        <>
          <FormControl variant="standard">
            <Select
              value={type}
              onChange={inputType}
              disabled={selection.x === -1 ? true : false}
            >
              {facilitiesList.map(facility => (
                <MenuItem value={facility.engName} key={facility.name}>
                  {facility.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button
            onClick={() => {
              handleSave();
            }}
            disabled={type === '' ? true : false}
          >
            생성하기
          </button>
        </>
      )}
      {selection.stage === EDIT_SELECTION && (
        <>
          <FormControl variant="standard">
            <Select value={selection.name} disabled>
              {facilitiesList.map(facility => (
                <MenuItem value={facility.engName} key={facility.name}>
                  {facility.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
