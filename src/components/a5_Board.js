import React, { useEffect, useState } from 'react';
import '../../src/assets/styles/a5_Board.css';
import { GiExpand } from 'react-icons/gi';

import { EMPTY, SEAT, ROOM, FACILITY } from '../const/object-type.const';

import {
  PREV_SELECTION,
  FIRST_SELECTION,
  EDIT_SELECTION,
  SECOND_SELECTION,
} from '../const/selection-type.const';

export const Board = ({
  selection,
  setSelection,
  tab,
  setTab,
  setBoard,
  board,
  seats,
  rooms,
  facilities,
}) => {
  const [scale, setScale] = useState(false);

  const scaleHandler = () => {
    if (scale === true) setScale(false);
    else setScale(true);
  };

  const clearBoard = () => {
    setBoard(
      board.map(row =>
        row.map(col => {
          return { ...col, select: false };
        }),
      ),
    );
  };

  useEffect(() => {
    if (selection.stage === PREV_SELECTION) {
      clearBoard();
    } else {
      setBoard(
        board.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            if (
              colIndex >= selection.x &&
              colIndex < selection.x + selection.width &&
              rowIndex >= selection.y &&
              rowIndex < selection.y + selection.height
            )
              return { ...col, select: true };
            return col;
          }),
        ),
      );
    }
  }, [selection]);

  const handleSelection = (x, y) => {
    if (board[y][x].type !== EMPTY) {
      // 기존 배치 선택
      if (selection.stage === PREV_SELECTION) {
        if (board[y][x].type === SEAT) {
          setTab(0);

          const selectedSeat = seats.find(seat => seat.id === board[y][x].id);

          setSelection({
            ...selectedSeat,
            stage: EDIT_SELECTION,
            type: SEAT,
          });
        } else if (board[y][x].type === ROOM) {
          setTab(1);

          const selectedRoom = rooms.find(room => room.id === board[y][x].id);

          setSelection({
            ...selectedRoom,
            stage: EDIT_SELECTION,
            type: ROOM,
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
            type: FACILITY,
          });
        }
      }
    } else {
      // 신규 배치 선택
      if (selection.stage === PREV_SELECTION) {
        setSelection({
          id: -1,
          name: '',
          x,
          y,
          width: 1,
          height: 1,
          maxUser: 0,
          stage: tab === 1 ? FIRST_SELECTION : SECOND_SELECTION,
          type: EMPTY,
        });
      } else if (selection.stage === FIRST_SELECTION) {
        setSelection({
          id: -1,
          name: '',
          x: x < selection.x ? x : selection.x,
          y: y < selection.y ? y : selection.y,
          width: Math.abs(x - selection.x) + 1,
          height: Math.abs(y - selection.y) + 1,
          maxUser: selection.maxUser,
          stage: SECOND_SELECTION,
          type: EMPTY,
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
          type: EMPTY,
        });
      }
    }
  };

  const itemStyle = (type, select) => {
    if (select)
      return { backgroundColor: '#D01C1F', border: '1px solid #D01C1F' };

    if (type === EMPTY) return { backgroundColor: 'white' };
    else if (type === SEAT)
      return {
        backgroundColor: 'rgb(147,149,151)',
        border: '1px solid rgb(147,149,151)',
      };
    else if (type === ROOM)
      return {
        backgroundColor: 'rgb(15,76,129)',
        border: '1px solid rgb(15,76,129)',
      };
    else if (type === FACILITY)
      return { backgroundColor: 'rgb(245,223,77)', border: 'rgb(245,223,77)' };
  };

  const Item = ({ board }) => {
    return board.map((row, y) =>
      row.map((col, x) => (
        <div
          className="board-item"
          key={x + y * row.length}
          onClick={() => {
            handleSelection(x, y);
          }}
          style={{
            ...itemStyle(col.type, col.select),
            position: 'absolute',
            width: `${col.width * 50}px`,
            height: `${col.height * 50}px`,
            left: `${x * 50}px`,
            top: `${y * 50}px`,
            border: col.width ? `1px solid #c2c2c2` : `none`,
          }}
        >
          {col.name}
        </div>
      )),
    );
  };

  const Board = () => {
    return (
      <div className="board-cover">
        <GiExpand
          className="scale-icon"
          size={25}
          onClick={e => scaleHandler()}
        />
        <div
          className={
            scale === false
              ? 'board-item-container'
              : 'board-item-container-scale'
          }
        >
          {board.length > 0 ? (
            <div
              className={
                scale === false ? 'board-item-cover ' : 'board-item-cover-scale'
              }
              style={{
                position: 'relative',
              }}
            >
              <Item board={board} />
            </div>
          ) : (
            <div className="board-no-item-text">
              <p>상단의 층 선택을 통해 층을 선택해주세요.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return <Board />;
};
