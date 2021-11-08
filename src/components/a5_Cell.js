import React from 'react';

const Cell = props => {
  return (
    <div
      className="cell"
      onClick={e => props.clickCell(props.data, e)}
      style={{ pointer: 'cursor' }}
    ></div>
  );
};

export default Cell;
