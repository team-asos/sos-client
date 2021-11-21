import React from 'react';

import { SeatTab } from './SeatTab';
import { RoomTab } from './RoomTab';
import { FacilityTab } from './FacilityTab';

import { EDIT_SELECTION } from '../../const/selection-type.const';
import './BoardSetting.css';

export const BoardSetting = ({
  selection,
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
    if (selection.stage === EDIT_SELECTION) return;

    setTab(tab);
  };

  const Tab = () => {
    if (tab === 0)
      return (
        <SeatTab
          selection={selection}
          floor={floor}
          seats={seats}
          setSeats={setSeats}
        />
      );
    else if (tab === 1)
      return (
        <RoomTab
          selection={selection}
          floor={floor}
          rooms={rooms}
          setRooms={setRooms}
        />
      );
    else if (tab === 2)
      return (
        <FacilityTab
          selection={selection}
          floor={floor}
          facilities={facilities}
          setFacilities={setFacilities}
        />
      );
  };

  const Setting = () => {
    return (
      <div className="board-setting">
        <div className="setting-tab-group">
          <button className="createbtn" onClick={() => handleTab(0)}>
            좌석
          </button>
          <button className="createbtn" onClick={() => handleTab(1)}>
            회의실
          </button>
          <button className="createbtn" onClick={() => handleTab(2)}>
            시설
          </button>
        </div>
        <div className="setting-tab">
          <Tab />
        </div>
      </div>
    );
  };

  return <Setting />;
};
