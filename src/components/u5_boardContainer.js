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
<<<<<<< HEAD
} from '../const/object-type.const';

=======
  RESERVED_SEAT,
} from '../const/object-type.const';

import { SELECTION_FIRST } from '../const/selection-type.const';

>>>>>>> develop
export const BoardContainer = ({ floor, userId }) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

  const [board, setBoard] = useState([]);
<<<<<<< HEAD
  const [originBoard, setOriginBoard] = useState([]);
=======
>>>>>>> develop

  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [selection, setSelection] = useState({
    id: -1,
    name: '',
    x: -1,
    y: -1,
<<<<<<< HEAD
    width: 0,
    height: 0,
    maxUser: 0,
    stage: 0,
  });

  const [tab, setTab] = useState(0);
=======
    stage: SELECTION_FIRST,
  });

>>>>>>> develop
  useEffect(() => {
    setBoard(
      Array.from({ length: floor.height }, () =>
        Array.from({ length: floor.width }, () => {
<<<<<<< HEAD
          return { type: EMPTY, id: -1, name: '' };
=======
          return { type: EMPTY, id: -1, name: '', width: 1, height: 1 };
>>>>>>> develop
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
<<<<<<< HEAD
        if (col.type === SELECTION) return { type: EMPTY, id: -1, name: '' };
=======
        if (col.type === SELECTION)
          return { type: EMPTY, id: -1, name: '', width: 1, height: 1 };
>>>>>>> develop
        return col;
      }),
    );

    for (let seat of seats) {
<<<<<<< HEAD
      newMap[seat.y][seat.x] = { type: SEAT, id: seat.id, name: seat.name };
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
=======
      if (seat.reservations.length === 0)
        newMap[seat.y][seat.x] = {
          type: SEAT,
          id: seat.id,
          name: seat.name,
          width: 1,
          height: 1,
        };
      else
        newMap[seat.y][seat.x] = {
          type: RESERVED_SEAT,
          id: seat.id,
          name: seat.reservations[0].user.name,
          width: 1,
          height: 1,
        };
    }

    for (let room of rooms) {
      newMap[room.y][room.x] = {
        type: ROOM,
        id: room.id,
        name: room.name,
        width: room.width,
        height: room.height,
      };

      newMap = newMap.map((row, rowIndex) =>
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
>>>>>>> develop

          return col;
        }),
      );
    }

    for (let facility of facilities) {
      newMap[facility.y][facility.x] = {
        type: FACILITY,
        id: facility.id,
        name: facility.type,
<<<<<<< HEAD
=======
        width: 1,
        height: 1,
>>>>>>> develop
      };
    }

    setBoard(newMap);
<<<<<<< HEAD
    setOriginBoard(newMap);
=======
>>>>>>> develop
  }, [facilities]);

  return (
    <div className={isPc ? 'u_boardContainer' : 'mobileBoardContainer'}>
      <Board
        selection={selection}
        setSelection={setSelection}
<<<<<<< HEAD
        tab={tab}
        setTab={setTab}
        board={board}
        setBoard={setBoard}
        originBoard={originBoard}
        seats={seats}
        rooms={rooms}
        facilities={facilities}
=======
        board={board}
        setBoard={setBoard}
        seats={seats}
>>>>>>> develop
      />
      <DateTimeForm selection={selection} userId={userId} />
    </div>
  );
};
