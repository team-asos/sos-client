import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
} from '../const/object-type.const';

import { PREV_SELECTION, FIRST_SELECTION } from '../const/selection-type.const';

import '../assets/styles/u5_board.css';

export const Board = ({ selection, setSelection, setBoard, board, seats }) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

  const [history, setHistory] = useState({ x: -1, y: -1 });

  const clearBoard = () => {
    setBoard(
      board.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex === history.x && rowIndex === history.y)
            return { ...col, type: SEAT };
          return col;
        }),
      ),
    );
  };

  useEffect(() => {
    if (selection.stage === PREV_SELECTION) {
      clearBoard();
    } else {
      setHistory({ x: selection.x, y: selection.y });

      setBoard(
        board.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            if (colIndex === selection.x && rowIndex === selection.y)
              return { ...col, type: SELECTION };
            return col;
          }),
        ),
      );
    }
  }, [selection]);

  const handleSelection = (x, y) => {
    if (board[y][x].type === SEAT) {
      const selectedSeat = seats.find(seat => seat.id === board[y][x].id);

      clearBoard();

      setSelection({
        ...selectedSeat,
        stage: FIRST_SELECTION,
      });
    } else if (board[y][x].type === EMPTY) {
      setSelection({
        id: -1,
        name: '',
        x: -1,
        y: -1,
        stage: PREV_SELECTION,
      });
    }
  };

  const itemStyle = type => {
    if (type === EMPTY) return { backgroundColor: 'none' };
    else if (type === SEAT) return { backgroundColor: 'green' };
    else if (type === ROOM) return { backgroundColor: 'blue' };
    else if (type === FACILITY) return { backgroundColor: 'yellow' };
    else if (type === SELECTION) return { backgroundColor: 'red' };
  };

  const Item = ({ board }) => {
    return board.map((row, y) =>
      row.map((col, x) => (
        <div
          className={col.type === SEAT ? 'u_boardSeatItem' : 'u_boardItem'}
          key={x + y * row.length}
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
      <div className={isPc ? 'u_boardCover' : 'mobileBoardCover'}>
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
