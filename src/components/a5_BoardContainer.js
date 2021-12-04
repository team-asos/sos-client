import React, { useState, useEffect } from 'react';

import { Board } from './a5_Board.js';

import { BoardSetting } from './BoardSetting';

import { EMPTY, SEAT, ROOM, FACILITY } from '../const/object-type.const';

import { SELECTION_FIRST } from '../const/selection-type.const';

import useSeats from '../hooks/useSeats';
import useRooms from '../hooks/useRooms';
import useFacilities from '../hooks/useFacilities';

export const BoardContainer = ({ floor }) => {
  const [board, setBoard] = useState([]);

  const [seats, setSeats] = useSeats(floor.id);
  const [rooms, setRooms] = useRooms(floor.id);
  const [facilities, setFacilities] = useFacilities(floor.id);

  const [selection, setSelection] = useState({
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

  const [tab, setTab] = useState(0);

  useEffect(() => {
    let newBoard = Array.from({ length: floor.height }, () =>
      Array.from({ length: floor.width }, () => {
        return {
          type: EMPTY,
          id: -1,
          name: '',
          width: 1,
          height: 1,
          select: false,
        };
      }),
    );

    for (let seat of seats) {
      newBoard[seat.y][seat.x] = {
        type: SEAT,
        id: seat.id,
        name: seat.name,
        width: 1,
        height: 1,
        select: false,
      };
    }

    for (let room of rooms) {
      newBoard = newBoard.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex === room.x && rowIndex === room.y)
            return {
              type: ROOM,
              id: room.id,
              name: room.name,
              width: room.width,
              height: room.height,
              select: false,
            };
          else if (colIndex >= room.x && colIndex < room.x + room.width)
            if (rowIndex >= room.y && rowIndex < room.y + room.height)
              return {
                ...col,
                width: 0,
                height: 0,
              };

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
        select: false,
      };
    }

    setBoard(newBoard);
  }, [floor, seats, rooms, facilities]);

  return (
    <div
      className="board-container"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
      }}
    >
      <Board
        selection={selection}
        setSelection={setSelection}
        tab={tab}
        setTab={setTab}
        board={board}
        setBoard={setBoard}
        seats={seats}
        rooms={rooms}
        facilities={facilities}
      />
      <BoardSetting
        selection={selection}
        setSelection={setSelection}
        tab={tab}
        setTab={setTab}
        floor={floor}
        seats={seats}
        setSeats={setSeats}
        rooms={rooms}
        setRooms={setRooms}
        facilities={facilities}
        setFacilities={setFacilities}
      />
    </div>
  );
};
