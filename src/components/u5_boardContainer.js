import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import DateTimeForm from './u5_dateTimeForm';
import { Board } from './u5_board';
import UserSearchForm from './u5_userSearchForm';

import './BoardContainer/index.scss';
import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
  RESERVED_SEAT,
} from '../const/object-type.const';
import { SELECTION_FIRST } from '../const/selection-type.const';
export const BoardContainer = ({
  floor,
  userId,
  getSeatsCnt,
  getReservedSeatsCnt,
  isToggleOn,
}) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

  const [searchUserId, setSearchUserId] = useState(0);

  const getUserId = id => {
    setSearchUserId(id);
  };
  const [board, setBoard] = useState([]);

  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [selection, setSelection] = useState({
    id: -1,
    name: '',
    x: -1,
    y: -1,
    stage: SELECTION_FIRST,
  });

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

  const fetchArrangement = async () => {
    await fetchSeats();
    await fetchRooms();
    await fetchFacilities();
  };

  useEffect(() => {
    setBoard(
      Array.from({ length: floor.height }, () =>
        Array.from({ length: floor.width }, () => {
          return { type: EMPTY, id: -1, name: '', width: 1, height: 1 };
        }),
      ),
    );

    fetchArrangement();
  }, [floor.id]);

  useEffect(() => {
    let newMap = board;

    newMap = newMap.map(row =>
      row.map(col => {
        if (col.type === SELECTION)
          return { type: EMPTY, id: -1, name: '', width: 1, height: 1 };
        return col;
      }),
    );
    for (let seat of seats) {
      getSeatsCnt(seats.length);
      if (seat.reservations.length === 0)
        newMap[seat.y][seat.x] = {
          type: SEAT,
          id: seat.id,
          name: seat.name,
          width: 1,
          height: 1,
        };
      else {
        newMap[seat.y][seat.x] = {
          type: RESERVED_SEAT,
          id: seat.id,
          name: seat.reservations[0].user.name,
          width: 1,
          height: 1,
        };
      }
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

          return col;
        }),
      );
    }
    for (let facility of facilities) {
      newMap[facility.y][facility.x] = {
        type: FACILITY,
        id: facility.id,
        name: getFacilityType(facility.type),
        width: 1,
        height: 1,
      };
    }
    setBoard(newMap);
  }, [facilities]);

  const getFacilityType = type => {
    return `/images/${type}.png`;
  };

  useEffect(() => {
    let count = 0;
    seats.map(seat => {
      if (seat.reservations.length > 0) {
        count++;
      }
    });

    getReservedSeatsCnt(count);
  }, [seats]);
  return (
    <div className={isPc ? 'u_boardContainer' : 'mobileBoardContainer'}>
      <Board
        selection={selection}
        setSelection={setSelection}
        board={board}
        setBoard={setBoard}
        seats={seats}
        searchUserId={searchUserId}
        isToggleOn={isToggleOn}
      />
      <div
        style={
          isPc
            ? { display: 'flex', flexDirection: 'column', height: '80vh' }
            : null
        }
      >
        <DateTimeForm selection={selection} userId={userId} />
        {/* {isPc ? <UserSearchForm getUserId={getUserId} /> : null} */}
      </div>
    </div>
  );
};
