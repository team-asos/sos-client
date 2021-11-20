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
    if (selection.stage === 0) {
      setBoard(originBoard);
    } else {
      let newMap = board;

      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (
            colIndex >= selection.x &&
            colIndex < selection.x + selection.width
          )
            if (
              rowIndex >= selection.y &&
              rowIndex < selection.y + selection.height
            )
              return { type: 3, name: '' };

          return col;
        }),
      );

      setBoard(newMap);
    }
  }, [selection]);

  const handleSelection = (x, y) => {
    if (board[y][x].type !== 0) {
      // 기존 좌석 선택

      if (board[y][x].type === 1) {
        setSelection({
          ...selection,
          x,
          y,
          stage: 3,
          id: board[y][x].id,
          name: board[y][x].name,
        });
      }
    } else {
      // 신규 선택

      if (selection.stage === 0) {
        if (tab === 1) {
          setSelection({
            x,
            y,
            width: 1,
            height: 1,
            stage: 1,
            id: -1,
            name: '',
          });
        } else {
          setSelection({
            x,
            y,
            width: 1,
            height: 1,
            stage: 2,
            id: -1,
            name: '',
          });
        }
      } else if (selection.stage === 1) {
        setSelection({
          ...selection,
          width: Math.abs(x - selection.x + 1),
          height: Math.abs(y - selection.y + 1),
          stage: 2,
          id: -1,
          name: '',
        });
      } else if (selection.stage === 2 || selection.stage === 3) {
        setSelection({
          x: -1,
          y: -1,
          width: 0,
          height: 0,
          stage: 0,
          id: -1,
          name: '',
        });
      }
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
          item.type === 0
            ? {
                backgroundColor: 'white',
              }
            : item.type === 1
            ? {
                backgroundColor: 'green',
              }
            : item.type === 2
            ? {
                backgroundColor: 'blue',
              }
            : {
                backgroundColor: 'red',
              }
        }
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {item.name}
        </div>
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
