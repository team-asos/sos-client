import React, { useEffect, useState } from 'react';
import '../../src/assets/styles/a5_Board.css';
import { GiExpand } from 'react-icons/gi';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
} from '../const/object-type.const';

import {
  PREV_SELECTION,
  FIRST_SELECTION,
  SECOND_SELECTION,
  EDIT_SELECTION,
} from '../const/selection-type.const';

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
    }
  };

  const itemStyle = type => {
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
    else if (type === SELECTION)
      return { backgroundColor: '#D01C1F', border: '1px solid #D01C1F' };
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
          {col.type === ROOM ? '' : col.name}
        </div>
      )),
    );
  };

  const [scale, setScale] = useState(false);

  const scaleHandler = () => {
    if (scale === true) setScale(false);
    else setScale(true);
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
                display: 'grid',
                gridTemplateColumns: `repeat(${
                  board.length > 0 ? board[0].length : '1'
                }, 2.8vw)`,
                gridTemplateRows: `repeat(${
                  board.length > 0 ? board.length : '1'
                }, 2.8vw)`,
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
