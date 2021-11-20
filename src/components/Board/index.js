import React, { useEffect } from 'react';

import './index.scss';

export const Board = ({
  selection,
  setSelection,
  tab,
  setBoard,
  board,
  originBoard,
}) => {
  useEffect(() => {
    if (selection.type === 0) {
      setBoard(originBoard);
    } else {
      let newMap = board;

      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (
            colIndex >= selection.x &&
            colIndex <= selection.x + selection.width
          )
            if (
              rowIndex >= selection.y &&
              rowIndex <= selection.y + selection.height
            )
              return 3;

          return col;
        }),
      );

      setBoard(newMap);
    }
  }, [selection]);

  const handleSelection = (x, y) => {
    if (selection.type === 0) {
      if (tab === 1) {
        setSelection({ ...selection, x, y, type: 1 });
      } else {
        setSelection({ ...selection, x, y, type: 2 });
      }
    } else if (selection.type === 1) {
      setSelection({
        ...selection,
        width: Math.abs(x - selection.x),
        height: Math.abs(y - selection.y),
        type: 2,
      });
    } else if (selection.type === 2) {
      setSelection({
        x: -1,
        y: -1,
        width: 0,
        height: 0,
        type: 0,
      });
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
      >
        <div></div>
      </td>
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
      <div
        style={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: 'inherit',
            height: ' 640px',
            overflow: 'auto',
            border: '1px solid red',
          }}
        >
          <table className="board-table">
            <tbody>
              <Rows board={board} />
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return <Board />;
};
