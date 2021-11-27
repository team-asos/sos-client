import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import DateTimeForm from './u5_dateTimeForm';
import { Board } from './u5_board';
import './BoardContainer/index.scss';
import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
  RESERVED_SEAT,
} from '../const/object-type.const';

export const BoardContainer = ({ floor, userId }) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

  const [board, setBoard] = useState([]);

  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [selection, setSelection] = useState({
    id: -1,
    name: '',
    x: -1,
    y: -1,
    stage: 0,
  });

  useEffect(() => {
    setBoard(
      Array.from({ length: floor.height }, () =>
        Array.from({ length: floor.width }, () => {
          return { type: EMPTY, id: -1, name: '' };
        }),
      ),
    );

    const fetchSeats = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/seats/search?floorId=${floor.id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      setSeats(await result.json());
    };

    const fetchRooms = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/rooms/search?floorId=${floor.id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      setRooms(await result.json());
    };

    const fetchFacilities = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/facilities/search?floorId=${floor.id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      setFacilities(await result.json());
    };

    fetchSeats();
    fetchRooms();
    fetchFacilities();
  }, [floor.id]);

  useEffect(() => {
    let newMap = board;

    newMap = newMap.map(row =>
      row.map(col => {
        if (col.type === SELECTION) return { type: EMPTY, id: -1, name: '' };
        return col;
      }),
    );

    for (let seat of seats) {
      if (seat.reservations.length === 0)
        newMap[seat.y][seat.x] = { type: SEAT, id: seat.id, name: seat.name };
      else
        newMap[seat.y][seat.x] = {
          type: RESERVED_SEAT,
          id: seat.id,
          name: seat.reservations[0].user.name,
        };
    }

    for (let room of rooms) {
      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex >= room.x && colIndex < room.x + room.width)
            if (rowIndex >= room.y && rowIndex < room.y + room.height)
              return {
                type: ROOM,
                id: room.id,
                name: room.name,
              };

          return col;
        }),
      );
    }

    for (let facility of facilities) {
      newMap[facility.y][facility.x] = {
        type: FACILITY,
        id: facility.id,
        name: facility.type,
      };
    }

    setBoard(newMap);
  }, [facilities]);

  return (
    <div className={isPc ? 'u_boardContainer' : 'mobileBoardContainer'}>
      <Board
        selection={selection}
        setSelection={setSelection}
        board={board}
        setBoard={setBoard}
        seats={seats}
      />
      <DateTimeForm selection={selection} userId={userId} />
    </div>
  );
};
