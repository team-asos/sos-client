import React, { useState, useEffect } from 'react';

import { Board } from '../Board/index';
import { BoardSetting } from '../BoardSetting';

import './index.scss';

export const BoardContainer = ({ floor }) => {
  const [board, setBoard] = useState([]);
  const [originBoard, setOriginBoard] = useState([]);

  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [selection, setSelection] = useState({
    x: -1,
    y: -1,
    width: 0,
    height: 0,
    type: 0,
  });

  const [tab, setTab] = useState(0);

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
      newMap[seat.y][seat.x] = 1;
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
  }, [rooms]);

  useEffect(() => {
    setSelection({ x: -1, y: -1, width: 0, height: 0, type: 0 });
  }, [tab]);

  return (
    <div className="board-container">
      <Board
        selection={selection}
        setSelection={setSelection}
        tab={tab}
        board={board}
        setBoard={setBoard}
        originBoard={originBoard}
      />
      <BoardSetting selection={selection} tab={tab} setTab={setTab} />
    </div>
  );
};
