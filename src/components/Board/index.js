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

  const itemStyle = type => {
    if (type === 0) return { backgroundColor: 'white' };
    else if (type === 1) return { backgroundColor: 'green' };
    else if (type === 2) return { backgroundColor: 'blue' };
    else if (type === 3) return { backgroundColor: 'red' };
  };

  const Item = ({ board }) => {
    return board.map((row, y) =>
      row.map((col, x) => (
        <div
          className="board-item"
          key={x + y}
          onClick={() => {
            handleSelection(x, y);
          }}
          style={itemStyle(col.type)}
        >
          {col.name}
        </div>
      )),
    );
  };

  const Board = () => {
    return (
      <div className="board-cover">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${
              board.length > 0 ? board[0].length : '1'
            }, 50px)`,
            gridTemplateRows: `repeat(${
              board.length > 0 ? board.length : '1'
            }, 50px)`,
          }}
        >
          <Item board={board} />
        </div>
      </div>
    );
  };

  return <Board />;
};
