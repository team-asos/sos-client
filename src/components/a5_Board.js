import React, { useEffect, useState } from 'react';
import { GiExpand } from 'react-icons/gi';

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

    const transformLength = (type, length) => {
      if (type === ROOM) {
        if (length === 0) return `0px`;
        else return `${length * 50 + 10 * (length - 1)}px`;
      } else return `${length * 50}px`;
    };

    const itemStyle = (type, select) => {
      if (select)
        return {
          backgroundColor: 'rgb(199,43,43)',
          color: 'whitesmoke',
          borderRadius: '4px',
        };

      if (type === EMPTY || type === FACILITY)
        return { backgroundColor: 'rgb(245, 245, 245)', borderRadius: '4px' };
      else if (type === SEAT)
        return {
          backgroundColor: '#51bf60',
          color: '#fff',
          borderRadius: '4px',
        };
      else if (type === ROOM)
        return {
          backgroundColor: '#E5E5E5',
          borderRadius: '4px',
        };
    };

    const facilityStyle = { width: '100%', height: '100%', opacity: '60%' };

    const Item = ({ map }) => {
      return map.map((row, y) =>
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
              width: transformLength(col.type, col.width),
              height: transformLength(col.type, col.height),

              left: `${x * 50 + 10 * x}px`,
              top: `${y * 50 + 10 * y}px`,
            }}
          >
            {col.type === FACILITY ? (
              <img style={facilityStyle} src={col.name} alt="" />
            ) : (
              col.name
            )}
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
            onClick={() => scaleHandler()}
          />
          <div
            className={
              scale === false
                ? 'board-item-container'
                : 'board-item-container-scale'
            }
          >
            {map.length > 0 ? (
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
                <Item map={map} />
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
