import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
  RESERVED_SEAT,
  SEARCH_USER_SEAT,
} from '../const/object-type.const';

import {
  SELECTION_FIRST,
  SELECTION_SECOND,
} from '../const/selection-type.const';

import '../assets/styles/u5_board.css';

export const Board = ({
  selection,
  setSelection,
  setBoard,
  board,
  seats,
  searchUserId,
  isToggleOn,
}) => {
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
    if (selection.stage === SELECTION_FIRST) {
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
        stage: SELECTION_SECOND,
      });
    } else if (board[y][x].type === EMPTY) {
      setSelection({
        id: -1,
        name: '',
        x: -1,
        y: -1,
        stage: SELECTION_FIRST,
      });
    }
  };
  const showSearchUser = (x, y) => {
    searchUserId.map(item => {
      if (item.room === null && item.status === 1) {
        if (item.endTime === null) {
          if (board[y][x].id === item.seat.id) {
            board[y][x].type = SEARCH_USER_SEAT;
          }
        }
      }
    });
  };

  const transformLength = (type, length) => {
    if (type === ROOM) {
      if (length === 0) return `0px`;
      else return `${length * 50 + 10 * (length - 1)}px`;
    } else return `${length * 50}px`;
  };

  const itemStyle = type => {
    if (type === EMPTY) return { backgroundColor: 'white' };
    else if (type === SEAT)
      return { backgroundColor: '#51bf60', color: '#fff', borderRadius: '4px' };
    else if (type === ROOM)
      return {
        backgroundColor: '#E5E5E5',
        borderRadius: '4px',
      };
    //else if (type === FACILITY) return { backgroundColor: '#f5df4d' };
    else if (type === SELECTION)
      return {
        backgroundColor: 'rgb(199, 43, 43)',
        color: '#fff',
        borderRadius: '4px',
      };
    else if (type === RESERVED_SEAT)
      return {
        backgroundColor: 'rgb(160, 160, 160)',
        color: '#fff',
        borderRadius: '4px',
      };
    else if (type === SEARCH_USER_SEAT)
      return {
        backgroundColor: 'red',
        color: '#fff',
        borderRadius: '4px',
      };
  };

  const Item = ({ board }) => {
    return board.map((row, y) =>
      row.map((col, x) => {
        if (searchUserId !== 0) {
          showSearchUser(x, y);
        }
        return (
          <div
            className={col.type === SEAT ? 'u_boardSeatItem' : 'u_boardItem'}
            key={x + y * row.length}
            onClick={() => {
              handleSelection(x, y);
            }}
            style={{
              ...itemStyle(col.type),
              position: 'absolute',
              width: transformLength(col.type, col.width),
              height: transformLength(col.type, col.height),
              left: `${x * 50 + 10 * x}px`,
              top: `${y * 50 + 10 * y}px`,
            }}
          >
            {col.type === FACILITY && isToggleOn ? (
              <img
                style={{ width: '100%', height: '100%', opacity: '60%' }}
                src={col.name}
                alt=""
              />
            ) : col.type !== FACILITY ? (
              col.name
            ) : null}
          </div>
        );
      }),
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
