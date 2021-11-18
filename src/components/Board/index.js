import React, { useState, useEffect } from 'react';

import './index.scss';

export const Board = ({ floor }) => {
  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [board, setBoard] = useState([]);

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
            if (rowIndex >= room.y && rowIndex < room.y + room.height) {
              return 2;
            }

          return col;
        }),
      );
    }

    setBoard(newMap);
  }, [seats, rooms]);

  const Row = ({ row }) => {
    return row.map((item, index) => (
      <td
        key={index}
        style={
          item === 0
            ? {
                backgroundColor: 'white',
              }
            : item === 1
            ? {
                backgroundColor: 'green',
              }
            : {
                backgroundColor: 'blue',
              }
        }
      ></td>
    ));
  };

  const Rows = ({ board }) => {
    return board.map((row, index) => (
      <tr key={index}>
        <Row row={row} />
      </tr>
    ));
  };

  const Board = () => {
    return (
      <table>
        <tbody>
          <Rows board={board} />
        </tbody>
      </table>
    );
  };

  return (
    <div className="board-container">
      <Board />
    </div>
  );
};
