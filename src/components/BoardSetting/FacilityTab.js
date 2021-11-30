import React, { useState } from 'react';
import * as bs from 'react-icons/bs';
import * as io from 'react-icons/io';

import {
  SELECTION_FIRST,
  SELECTION_EDIT,
} from '../../const/selection-type.const';

import { FormControl, Select, MenuItem } from '@mui/material';

export const FacilityTab = ({
  selection,
  setSelection,
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
        setSelection({ ...selection, stage: SELECTION_FIRST });
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
        setSelection({ ...selection, stage: SELECTION_FIRST });
      }
    };

    deleteFacility();
  };

  const FindFacility = ({ name }) => {
    console.log(name);
    return facilitiesList.map(facility =>
      name === facility.engName ? <>{facility.name}</> : '',
    );
  };

  return (
    <div className="seat-tab">
      {selection.stage !== SELECTION_EDIT && (
        <p className="text-notification">
          시설 생성 시, <bs.BsCheckAll style={{ color: '#c00000' }} />는{' '}
          <span className="text-notification-strong">필수 선택칸</span>입니다.
          <br />
          도면의 흰색 부분 선택 시, 생성이 종료됩니다.
        </p>
      )}
      {selection.stage === SELECTION_EDIT && (
        <p className="text-notification">
          <io.IoIosNotifications size={18} style={{ color: '#c00000' }} />{' '}
          도면의 흰색 부분 선택 시, <br />
          조회가 종료됩니다.
        </p>
      )}
      <label>
        <bs.BsCheckAll style={{ color: 'transparent' }} />
        시설 위치
      </label>
      <div style={{ marginLeft: '15%' }}>
        <label>
          X :{'  '}
          <input
            value={selection.x}
            className="seat-input-location"
            disabled
          />{' '}
          ,
        </label>
        <label style={{ marginLeft: '5%' }}>
          Y :{'  '}
          <input value={selection.y} className="seat-input-location" disabled />
        </label>
      </div>
      {selection.stage !== SELECTION_EDIT && (
        <>
          <label style={{ marginTop: '5%' }}>
            <bs.BsCheckAll style={{ color: '#c00000' }} />
            시설 타입 :{'  '}
            <FormControl variant="standard">
              <Select
                style={{ width: '10.5vw' }}
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
          </label>
          <button
            className="seat-btn-make"
            onClick={() => {
              handleSave();
            }}
            disabled={type === '' ? true : false}
          >
            생성하기
          </button>
        </>
      )}
      {selection.stage === SELECTION_EDIT && (
        <>
          <label style={{ marginTop: '5%' }}>
            <bs.BsCheckAll style={{ color: 'transparent' }} />
            시설 타입 :{'  '}
            <FindFacility name={selection.name} />
          </label>
          <button
            className="seat-btn-make"
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
