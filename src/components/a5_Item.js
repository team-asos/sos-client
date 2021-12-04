import React from 'react';

import { EMPTY, SEAT, ROOM, FACILITY } from '../const/object-type.const';

export const Item = React.memo(({ map, handleSelection }) => {
  const itemStyle = (type, select, width) => {
    if (select)
      return {
        backgroundColor: 'rgb(199,43,43)',
        color: 'whitesmoke',
        borderRadius: '4px',
      };

    if (type === EMPTY || type === FACILITY)
      return {
        backgroundColor: 'rgb(245, 245, 245)',
        border: width === 0 ? 'none' : '1px solid #c2c2c2',
        borderRadius: '4px',
      };
    else if (type === SEAT)
      return {
        backgroundColor: '#51bf60',
        color: '#fff',
        border: '1px solid #c2c2c2',
        borderRadius: '4px',
      };
    else if (type === ROOM)
      return {
        backgroundColor: '#E5E5E5',
        border: '1px solid #c2c2c2',
        borderRadius: '4px',
      };
  };

  const facilityStyle = { width: '100%', height: '100%', opacity: '60%' };

  const transformLength = (type, length) => {
    if (type === ROOM) {
      if (length === 0) return `0px`;
      else return `${length * 50 + 10 * (length - 1)}px`;
    } else return `${length * 50}px`;
  };

  return map.map((row, y) =>
    row.map((col, x) => (
      <div
        className="board-item"
        key={x + y * row.length}
        onClick={() => {
          handleSelection(x, y);
        }}
        style={{
          ...itemStyle(col.type, col.select, col.width),
          position: 'absolute',
          width: transformLength(col.type, col.width),
          height: transformLength(col.type, col.height),
          left: `${x * 50 + 10 * x}px`,
          top: `${y * 50 + 10 * y}px`,
        }}
      >
        {col.type === FACILITY ? (
          <img style={facilityStyle} src={col.name} alt="" />
        ) : (
          col.name
        )}
      </div>
    )),
  );
});
