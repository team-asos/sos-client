import React from 'react';

import { SeatTab } from './SeatTab';
import { RoomTab } from './RoomTab';
import { FacilityTab } from './FacilityTab';

import './index.scss';

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
          <button onClick={() => setTab(0)}>좌석</button>
          <button onClick={() => setTab(1)}>회의실</button>
          <button onClick={() => setTab(2)}>시설</button>
        </div>
        <div className="setting-tab">
          <Tab />
        </div>
      </div>
    );
  };

  return <Setting />;
};
