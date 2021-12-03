import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import ReserveModal from './u5_dateTimeForm';
import { Board } from './u5_board';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  RESERVED_SEAT,
} from '../const/object-type.const';

import useSeats from '../hooks/useSeats';
import useRooms from '../hooks/useRooms';
import useFacilities from '../hooks/useFacilities';

import './BoardContainer/index.scss';

export const BoardContainer = ({
  floor,
  userId,
  isToggleOn,
  setSeatCount,
  setUsedSeatCount,
}) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

  const [board, setBoard] = useState([]);

  const seats = useSeats(floor.id);
  const rooms = useRooms(floor.id);
  const facilities = useFacilities(floor.id);

  const [selection, setSelection] = useState({
    id: -1,
    name: '',
    x: -1,
    y: -1,
  });

  useEffect(() => {
    let newBoard = Array.from({ length: floor.height }, () =>
      Array.from({ length: floor.width }, () => {
        return { type: EMPTY, id: -1, name: '', width: 1, height: 1 };
      }),
    );

    for (let seat of seats) {
      if (seat.reservations.length === 0)
        newBoard[seat.y][seat.x] = {
          type: SEAT,
          id: seat.id,
          name: seat.name,
          width: 1,
          height: 1,
        };
      else {
        newBoard[seat.y][seat.x] = {
          type: RESERVED_SEAT,
          id: seat.id,
          name: seat.reservations[0].user.name,
          width: 1,
          height: 1,
        };
      }
    }

    for (let room of rooms) {
      newBoard[room.y][room.x] = {
        type: ROOM,
        id: room.id,
        name: room.name,
        width: room.width,
        height: room.height,
      };

      newBoard = newBoard.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex === room.x && rowIndex === room.y)
            return {
              type: ROOM,
              id: room.id,
              name: room.name,
              width: room.width,
              height: room.height,
            };
          else if (colIndex >= room.x && colIndex < room.x + room.width)
            if (rowIndex >= room.y && rowIndex < room.y + room.height)
              return { ...col, width: 0, height: 0 };

          return col;
        }),
      );
    }

    for (let facility of facilities) {
      newBoard[facility.y][facility.x] = {
        type: FACILITY,
        id: facility.id,
        name: `/images/${facility.type}.png`,
        width: 1,
        height: 1,
      };
    }

    setBoard(newBoard);
  }, [floor, rooms, seats, facilities, setSeatCount, setUsedSeatCount]);

  useEffect(() => {
    let seatCount = 0;
    let usedSeatCount = 0;

    board.map(row =>
      row.map(col => {
        if (col.type === SEAT) seatCount++;
        if (col.type === RESERVED_SEAT) usedSeatCount++;

        return col;
      }),
    );

    setSeatCount(seatCount + usedSeatCount);
    setUsedSeatCount(usedSeatCount);
  }, [board, seats, setSeatCount, setUsedSeatCount]);

  return (
    <div className={isPc ? 'u_boardContainer' : 'mobileBoardContainer'}>
      <Board
        setSelection={setSelection}
        board={board}
        seats={seats}
        isToggleOn={isToggleOn}
      />
      <div
        style={
          isPc
            ? { display: 'flex', flexDirection: 'column', height: '80vh' }
            : null
        }
      >
        <ReserveModal
          selection={selection}
          userId={userId}
          board={board}
          setBoard={setBoard}
        />
      </div>
    </div>
  );
};
