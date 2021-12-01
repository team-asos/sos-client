import React, { useEffect, useState } from 'react';
import '../../src/assets/styles/a5_Board.css';
import { GiExpand } from 'react-icons/gi';
import { EMPTY, SEAT, ROOM, FACILITY } from '../const/object-type.const';
import {
  SELECTION_FIRST,
  SELECTION_SECOND,
  SELECTION_EDIT,
  SELECTION_THIRD,
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

  const clearSelection = () => {
    setSelection({
      id: -1,
      name: '',
      x: -1,
      y: -1,
      width: 0,
      height: 0,
      maxUser: 0,
      stage: SELECTION_FIRST,
      type: EMPTY,
    });
  };

  useEffect(() => {
    if (selection.stage === SELECTION_FIRST) {
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
      if (selection.stage === SELECTION_FIRST) {
        const TYPE = board[y][x].type;
        const TAB_TYPE = TYPE - 1;
        let selectedItem;

        if (TYPE === SEAT)
          selectedItem = seats.find(seat => seat.id === board[y][x].id);
        else if (TYPE === ROOM)
          selectedItem = rooms.find(room => room.id === board[y][x].id);
        else if (TYPE === FACILITY)
          selectedItem = facilities.find(
            facility => facility.id === board[y][x].id,
          );

        setTab(TAB_TYPE);

        setSelection({
          ...selectedItem,
          stage: SELECTION_EDIT,
          type: TYPE,
        });
      }
    } else {
      // 신규 배치 선택
      if (selection.stage === SELECTION_FIRST) {
        setSelection({
          ...selection,
          x,
          y,
          width: 1,
          height: 1,
          stage: tab === 1 ? SELECTION_SECOND : SELECTION_THIRD,
          type: EMPTY,
        });
      } else if (selection.stage === SELECTION_SECOND) {
        setSelection({
          ...selection,
          x: x < selection.x ? x : selection.x,
          y: y < selection.y ? y : selection.y,
          width: Math.abs(x - selection.x) + 1,
          height: Math.abs(y - selection.y) + 1,
          stage: SELECTION_THIRD,
          type: EMPTY,
        });
      } else if (
        selection.stage === SELECTION_THIRD ||
        selection.stage === SELECTION_EDIT
      ) {
        clearSelection();
      }
    }
  };

  const itemStyle = (type, select) => {
    if (select)
      return { backgroundColor: 'rgb(199,43,43)', color: 'whitesmoke' };

    if (type === EMPTY) return { backgroundColor: 'white' };
    else if (type === SEAT)
      return {
        backgroundColor: '#51bf60',
        color: 'whitesmoke',
      };
    else if (type === ROOM)
      return {
        backgroundColor: '#a0a0a0',
      };
    else if (type === FACILITY) return { backgroundColor: 'white' };
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
          {col.type === FACILITY ? (
            <img
              style={{ width: '100%', height: '100%', opacity: '70%' }}
              src={col.name}
              alt=""
            />
          ) : col.type !== FACILITY ? (
            col.name
          ) : null}
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
