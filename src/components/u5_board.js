<<<<<<< HEAD
import React, { useEffect } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> develop
import { useMediaQuery } from 'react-responsive';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
<<<<<<< HEAD
} from '../const/object-type.const';

import {
  PREV_SELECTION,
  FIRST_SELECTION,
  SECOND_SELECTION,
  EDIT_SELECTION,
=======
  RESERVED_SEAT,
} from '../const/object-type.const';

import {
  SELECTION_FIRST,
  SELECTION_SECOND,
>>>>>>> develop
} from '../const/selection-type.const';

import '../assets/styles/u5_board.css';

<<<<<<< HEAD
export const Board = ({
  selection,
  setSelection,
  tab,
  setTab,
  setBoard,
  board,
  originBoard,
  seats,
  rooms,
  facilities,
}) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  useEffect(() => {
    if (selection.stage === PREV_SELECTION) {
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
              return { type: SELECTION, name: '' };

          return col;
        }),
      );

      setBoard(newMap);
    }
  }, [selection]);
  const handleSelection = (x, y) => {
    if (board[y][x].type !== EMPTY) {
      // 기존 좌석 선택
      if (selection.stage === PREV_SELECTION) {
        if (board[y][x].type === SEAT) {
          setTab(0);

          const selectedSeat = seats.find(seat => seat.id === board[y][x].id);
          setSelection({
            ...selectedSeat,
            stage: EDIT_SELECTION,
          });
        } else if (board[y][x].type === ROOM) {
          setTab(1);

          const selectedRoom = rooms.find(room => room.id === board[y][x].id);

          setSelection({
            ...selectedRoom,
            stage: EDIT_SELECTION,
          });
        } else if (board[y][x].type === FACILITY) {
          setTab(2);

          const selectedFacility = facilities.find(
            facility => facility.id === board[y][x].id,
          );

          setSelection({
            ...selectedFacility,
            name: selectedFacility.type,
            stage: EDIT_SELECTION,
          });
        }
      }
    } else {
      // 신규 선택
      if (selection.stage === PREV_SELECTION) {
        if (tab === 1) {
          setSelection({
            id: -1,
            name: '',
            x,
            y,
            width: 1,
            height: 1,
            maxUser: 0,
            stage: FIRST_SELECTION,
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
            stage: SECOND_SELECTION,
          });
        }
      } else if (selection.stage === FIRST_SELECTION) {
        setSelection({
          ...selection,
          id: -1,
          name: '',
          width: Math.abs(x - selection.x + 1),
          height: Math.abs(y - selection.y + 1),
          stage: SECOND_SELECTION,
        });
      } else if (
        selection.stage === SECOND_SELECTION ||
        selection.stage === EDIT_SELECTION
      ) {
        setSelection({
          id: -1,
          name: '',
          x: -1,
          y: -1,
          width: 0,
          height: 0,
          maxUser: 0,
          stage: PREV_SELECTION,
        });
      }
=======
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
>>>>>>> develop
    }
  };

  const itemStyle = type => {
<<<<<<< HEAD
    if (type === EMPTY) return { backgroundColor: 'none' };
    else if (type === SEAT) return { backgroundColor: 'green' };
    else if (type === ROOM) return { backgroundColor: 'blue' };
    else if (type === FACILITY) return { backgroundColor: 'yellow' };
    else if (type === SELECTION) return { backgroundColor: 'red' };
=======
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
>>>>>>> develop
  };

  const Item = ({ board }) => {
    return board.map((row, y) =>
      row.map((col, x) => (
        <div
<<<<<<< HEAD
          className="u_boardItem"
          key={x + y}
          onClick={() => {
            handleSelection(x, y);
          }}
          style={itemStyle(col.type)}
=======
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
>>>>>>> develop
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
<<<<<<< HEAD
            display: 'grid',
            gridTemplateColumns: `repeat(${
              board.length > 0 ? board[0].length : '1'
            }, 50px)`,
            gridTemplateRows: `repeat(${
              board.length > 0 ? board.length : '1'
            }, 50px)`,
=======
            position: 'relative',
>>>>>>> develop
          }}
        >
          <Item board={board} />
        </div>
      </div>
    );
  };

  return <Board />;
};
