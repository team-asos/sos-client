import React from 'react';

const Cell = props => {
  return (
    <div
      className="cell"
      onClick={() => props.clickCell(props.data)}
      //onClick={() => console.log(props.data)}
      style={{ pointer: 'cursor' }}
    ></div>
  );
};

export default Cell;
