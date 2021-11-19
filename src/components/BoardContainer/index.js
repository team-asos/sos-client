import React, { useState, useEffect } from 'react';

import { Board } from '../Board/index';
import { BoardSetting } from '../BoardSetting';

import './index.scss';

export const BoardContainer = ({ floor }) => {
  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [originBoard, setOriginBoard] = useState([]);
  const [board, setBoard] = useState([]);

  const [area, setArea] = useState({
    x: null,
    y: null,
    width: null,
    height: null,
    type: 0,
  });

  useEffect(() => {
    setBoard(
      Array.from({ length: floor.height }, () =>
        Array.from({ length: floor.width }, () => 0),
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

    fetchSeats();
    fetchRooms();
  }, [floor.id]);

  useEffect(() => {
    let newMap = board;

    for (let seat of seats) {
      newMap[seat.x][seat.y] = 1;
    }

    for (let room of rooms) {
      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex >= room.x && colIndex < room.x + room.width)
            if (rowIndex >= room.y && rowIndex < room.y + room.height) return 2;

          return col;
        }),
      );
    }

    setBoard(newMap);
    setOriginBoard(newMap);
  }, [seats, rooms]);

  return (
    <div className="board-container">
      <Board
        area={area}
        setArea={setArea}
        board={board}
        setBoard={setBoard}
        originBoard={originBoard}
      />
      <BoardSetting area={area} />
    </div>
  );
};
