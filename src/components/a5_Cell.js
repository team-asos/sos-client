import React from 'react';

const Cell = props => {
  console.log(props.data);
  let renderCell = () => {
    if (props.data.isOpen) {
      return <div className="cell open">h</div>;
    } else {
      return (
        <div className="cell" onClick={() => console.log('Clicked!')}>
          hh
        </div>
      );
    }
  };
  return renderCell();
};

export default Cell;
