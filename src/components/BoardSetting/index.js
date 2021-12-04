import React from 'react';
import { BsInfoSquareFill } from 'react-icons/bs';

import { SeatTab } from './SeatTab';
import { RoomTab } from './RoomTab';
import { FacilityTab } from './FacilityTab';

import { SELECTION_EDIT } from '../../const/selection-type.const';
import './BoardSetting.css';

export const BoardSetting = ({
  selection,
  setSelection,
  tab,
  setTab,
  floor,
  seats,
  setSeats,
  rooms,
  setRooms,
  facilities,
  setFacilities,
}) => {
  const handleTab = tab => {
    if (selection.stage === SELECTION_EDIT) return;

    setTab(tab);
  };

  const Tab = () => {
    if (tab === 0)
      return (
        <SeatTab
          selection={selection}
          setSelection={setSelection}
          floor={floor}
          seats={seats}
          setSeats={setSeats}
        />
      );
    else if (tab === 1)
      return (
        <RoomTab
          selection={selection}
          setSelection={setSelection}
          floor={floor}
          rooms={rooms}
          setRooms={setRooms}
        />
      );
    else if (tab === 2)
      return (
        <FacilityTab
          selection={selection}
          setSelection={setSelection}
          floor={floor}
          facilities={facilities}
          setFacilities={setFacilities}
        />
      );
  };

  const Setting = () => {
    return (
      <div className="board-setting">
        <div style={{ height: '70%' }}>
          <div className="setting-tab-group">
            <button
              className={tab === 0 ? 'createbtn-click' : 'createbtn'}
              onClick={() => handleTab(0)}
            >
              좌석
            </button>
            <button
              className={tab === 1 ? 'createbtn-click' : 'createbtn'}
              onClick={() => handleTab(1)}
            >
              회의실
            </button>
            <button
              className={tab === 2 ? 'createbtn-click' : 'createbtn'}
              onClick={() => handleTab(2)}
            >
              시설
            </button>
          </div>
          <div className="setting-tab">
            <Tab />
          </div>
        </div>
        <div className="floor-info" style={{ height: '30%' }}>
          {floor.length === 0 ? (
            <p style={{ fontSize: '0.9em', fontStyle: 'italic' }}>
              층을 선택하면 정보가 나타납니다.
            </p>
          ) : (
            <div className="floor-info-detail">
              <p>
                <BsInfoSquareFill
                  style={{ marginRight: '3%', color: 'rgb(151,32,32)' }}
                />
                층 정보
              </p>
              <table>
                <tbody>
                  <tr>
                    <th>층 이름</th>
                    <td>{floor.name}</td>
                  </tr>
                  <tr>
                    <th>층 크기(가로, 세로)</th>
                    <td>
                      ({floor.width},{floor.height})
                    </td>
                  </tr>
                  <tr>
                    <th>좌석 개수</th>
                    <td>{seats.length}</td>
                  </tr>
                  <tr>
                    <th>회의실 개수</th>
                    <td>{rooms.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  return <Setting />;
};
