import React from 'react';

const Cell = props => {
  return (
    <div
      className="cell"
      onClick={e => props.clickCell(props.data, e)}
      style={{ cursor: 'pointer', ...props.style }}
    >
      {props.seatName}
    </div>
  );
};

export default Cell;
