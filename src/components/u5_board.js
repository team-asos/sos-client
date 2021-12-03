import React from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  RESERVED_SEAT,
} from '../const/object-type.const';

import '../assets/styles/u5_board.css';

export const Board = React.memo(
  ({ setSelection, board, seats, isToggleOn }) => {
    const isPc = useMediaQuery({
      query: '(min-width:768px)',
    });

    const handleSelection = (x, y) => {
      if (board[y][x].type === SEAT) {
        const selectedSeat = seats.find(seat => seat.id === board[y][x].id);

        setSelection({
          ...selectedSeat,
        });
      }
    };

    const transformLength = (type, length) => {
      if (type === ROOM) {
        if (length === 0) return `0px`;
        else return `${length * 50 + 10 * (length - 1)}px`;
      } else return `${length * 50}px`;
    };

    const itemStyle = type => {
      if (type === EMPTY)
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
      else if (type === RESERVED_SEAT)
        return {
          backgroundColor: 'rgb(160, 160, 160)',
          color: '#fff',
          borderRadius: '4px',
        };
    };

    const facilityStyle = () => {
      return { width: '100%', height: '100%', opacity: '60%' };
    };

    const Item = ({ board }) => {
      return board.map((row, y) =>
        row.map((col, x) => {
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
                <img style={facilityStyle} src={col.name} alt="" />
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
  },
);
