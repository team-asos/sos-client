import React, { useEffect, useState } from 'react';
import { GiExpand } from 'react-icons/gi';

import { Item } from './a5_Item';

import { EMPTY, SEAT, ROOM, FACILITY } from '../const/object-type.const';
import {
  SELECTION_FIRST,
  SELECTION_SECOND,
  SELECTION_EDIT,
  SELECTION_THIRD,
} from '../const/selection-type.const';

import '../../src/assets/styles/a5_Board.css';

export const Board = React.memo(
  ({
    selection,
    setSelection,
    tab,
    setTab,
    board,
    seats,
    rooms,
    facilities,
  }) => {
    const [map, setMap] = useState([]);

    useEffect(() => {
      setMap(board);
    }, [board]);

    const [scale, setScale] = useState(false);

    const scaleHandler = () => {
      if (scale === true) setScale(false);
      else setScale(true);
    };

    const clearBoard = () => {
      setMap(
        map.map(row =>
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
        setMap(
          map.map((row, rowIndex) =>
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
      if (map[y][x].type !== EMPTY) {
        // 기존 배치 선택
        if (selection.stage === SELECTION_FIRST) {
          const TYPE = map[y][x].type;
          const TAB_TYPE = TYPE - 1;
          let selectedItem;

          if (TYPE === SEAT)
            selectedItem = seats.find(seat => seat.id === map[y][x].id);
          else if (TYPE === ROOM)
            selectedItem = rooms.find(room => room.id === map[y][x].id);
          else if (TYPE === FACILITY)
            selectedItem = facilities.find(
              facility => facility.id === map[y][x].id,
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

    const Board = () => {
      return (
        <div className="board-cover">
          <GiExpand
            className="scale-icon"
            size={25}
            onClick={() => scaleHandler()}
          />
          <div
            className={
              scale === false
                ? 'board-item-container'
                : 'board-item-container-scale'
            }
          >
            {map ? (
              <div
                className={
                  scale === false
                    ? 'board-item-cover '
                    : 'board-item-cover-scale'
                }
                style={{
                  position: 'relative',
                }}
              >
                <Item map={map} handleSelection={handleSelection} />
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
  },
);
