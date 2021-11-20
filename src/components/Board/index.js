import React, { useEffect } from 'react';

import './index.scss';

export const Board = ({
  selection,
  setSelection,
  tab,
  setBoard,
  board,
  originBoard,
  seats,
  rooms,
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
      if (selection.stage === 0) {
        if (board[y][x].type === 1 && tab === 0) {
          const selectedSeat = seats.find(seat => seat.id === board[y][x].id);

          setSelection({
            ...selectedSeat,
            stage: 3,
          });
        } else if (board[y][x].type === 2 && tab === 1) {
          const selectedRoom = rooms.find(room => room.id === board[y][x].id);

          setSelection({
            ...selectedRoom,
            stage: 3,
          });
        }
      }
    } else {
      // 신규 선택
      if (selection.stage === 0) {
        if (tab === 1) {
          setSelection({
            id: -1,
            name: '',
            x,
            y,
            width: 1,
            height: 1,
            maxUser: 0,
            stage: 1,
          });
        } else {
          setSelection({
            id: -1,
            name: '',
            x,
            y,
            width: 1,
            height: 1,
            maxUser: 0,
            stage: 2,
          });
        }
      } else if (selection.stage === 1) {
        setSelection({
          ...selection,
          id: -1,
          name: '',
          width: Math.abs(x - selection.x + 1),
          height: Math.abs(y - selection.y + 1),
          stage: 2,
        });
      } else if (selection.stage === 2 || selection.stage === 3) {
        setSelection({
          id: -1,
          name: '',
          x: -1,
          y: -1,
          width: 0,
          height: 0,
          maxUser: 0,
          stage: 0,
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
