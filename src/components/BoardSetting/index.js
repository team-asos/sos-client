import React from 'react';

import { SeatTab } from './SeatTab';

import './index.scss';

export const BoardSetting = ({ selection, tab, setTab }) => {
  const Tab = () => {
    if (tab === 0) return <SeatTab selection={selection} />;
    else if (tab === 1) return <div>회의실</div>;
    else if (tab === 2) return <div>시설</div>;
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