import React, { useState, useEffect } from 'react';

import { Board } from '../Board/index';
import { BoardSetting } from '../BoardSetting';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
} from '../../const/object-type.const';

import './index.scss';

export const BoardContainer = ({ floor }) => {
  const [board, setBoard] = useState([]);
  const [originBoard, setOriginBoard] = useState([]);

  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [selection, setSelection] = useState({
    id: -1,
    name: '',
    x: -1,
    y: -1,
    width: 0,
    height: 0,
    maxUser: 0,
    stage: 0,
  });

  const [tab, setTab] = useState(0);

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
    setOriginBoard(newMap);
  }, [facilities]);

  return (
    <div className="board-container">
      <Board
        selection={selection}
        setSelection={setSelection}
        tab={tab}
        setTab={setTab}
        board={board}
        setBoard={setBoard}
        originBoard={originBoard}
        seats={seats}
        rooms={rooms}
        facilities={facilities}
      />
      <BoardSetting
        selection={selection}
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
