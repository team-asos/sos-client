import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
  RESERVED_SEAT,
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
    if (type === EMPTY) return { backgroundColor: '#fff' };
    else if (type === SEAT)
      return { backgroundColor: '#293241', color: '#fff' };
    else if (type === ROOM)
      return { backgroundColor: '#fff', border: '2px solid #8d99ae' };
    else if (type === FACILITY) return { backgroundColor: '#f5df4d' };
    else if (type === SELECTION)
      return { backgroundColor: '#a70000', color: '#fff' };
    else if (type === RESERVED_SEAT)
      return { backgroundColor: '#8d99ae', color: '#fff' };
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
          style={{
            ...itemStyle(col.type),
            position: 'absolute',
            width: `${col.width * 50}px`,
            height: `${col.height * 50}px`,
            left: `${x * 50}px`,
            top: `${y * 50}px`,
            border:
              col.width && col.type === ROOM
                ? `2px solid rgb(141, 153, 174)`
                : `none`,
          }}
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
            position: 'relative',
          }}
        >
          <Item board={board} />
        </div>
      </div>
    );
  };

  return <Board />;
};
