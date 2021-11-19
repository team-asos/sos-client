import React, { useState, useEffect } from 'react';

import './index.scss';

export const Board = ({ area, setArea, board, setBoard, originBoard }) => {
  useEffect(() => {
    if (area.type === 0) {
      setBoard(originBoard);
    } else {
      let newMap = board;

      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex >= area.x && colIndex <= area.x + area.width)
            if (rowIndex >= area.y && rowIndex <= area.y + area.height)
              return 3;

          return col;
        }),
      );
      setBoard(newMap);
    }
  }, [area]);

  const handleSelection = (x, y) => {
    if (area.type === 0) {
      setArea({ ...area, x, y, type: 1 });
    } else if (area.type === 1) {
      setArea({
        ...area,
        width: Math.abs(x - area.x),
        height: Math.abs(y - area.y),
        type: 2,
      });
    } else if (area.type === 2) {
      setArea({ x: null, y: null, width: null, height: null, type: 0 });
    }
  };

  const Row = ({ row, y }) => {
    return row.map((item, index) => (
      <td
        className="board-content"
        onClick={() => {
          handleSelection(index, y);
        }}
        key={index}
        style={
          item === 0
            ? {
                backgroundColor: 'white',
              }
            : item === 1
            ? {
                backgroundColor: 'green',
              }
            : item === 2
            ? {
                backgroundColor: 'blue',
              }
            : {
                backgroundColor: 'red',
              }
        }
      ></td>
    ));
  };

  const Rows = ({ board }) => {
    return board.map((row, index) => (
      <tr key={index}>
        <Row row={row} y={index} />
      </tr>
    ));
  };

  const Board = () => {
    return (
      <table className="board-table">
        <tbody>
          <Rows board={board} />
        </tbody>
      </table>
    );
  };

  return <Board />;
};
