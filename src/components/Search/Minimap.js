import React, { useState, useEffect } from 'react';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
} from '../../const/object-type.const';

export const Minimap = ({ size, seatId, floorId }) => {
  const [board, setBoard] = useState([]);

  const [floor, setFloor] = useState(null);
  const [seats, setSeats] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const fetchFloor = async floorId => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/floors/${floorId}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    setFloor(await result.json());
  };

  const fetchSeats = async floorId => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/seats/search?floorId=${floorId}`,
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

  const fetchRooms = async floorId => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/rooms/search?floorId=${floorId}`,
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

  const fetchFacilities = async floorId => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/facilities/search?floorId=${floorId}`,
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

  const fetchArrangement = async floorId => {
    await fetchSeats(floorId);
    await fetchRooms(floorId);
    await fetchFacilities(floorId);
  };

  useEffect(() => {
    fetchFloor(floorId);
  }, [floorId]);

  useEffect(() => {
    if (floor !== null) {
      setBoard(
        Array.from({ length: floor.height }, () =>
          Array.from({ length: floor.width }, () => {
            return { type: 0, width: 1, height: 1 };
          }),
        ),
      );

      fetchArrangement(floor.id);
    }
  }, [floor]);

  useEffect(() => {
    let newMap = board;

    for (let seat of seats) {
      if (seat.id === seatId)
        newMap[seat.y][seat.x] = {
          type: SELECTION,
          width: 1,
          height: 1,
        };
      else
        newMap[seat.y][seat.x] = {
          type: SEAT,
          name: seat.name,
          width: 1,
          height: 1,
        };
    }

    for (let room of rooms) {
      newMap[room.y][room.x] = {
        type: ROOM,
        name: room.name,
        width: room.width,
        height: room.height,
      };

      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex === room.x && rowIndex === room.y)
            return {
              type: ROOM,
              name: room.name,
              width: room.width,
              height: room.height,
            };
          else if (colIndex >= room.x && colIndex < room.x + room.width)
            if (rowIndex >= room.y && rowIndex < room.y + room.height)
              return { type: ROOM, width: 0, height: 0 };

          return col;
        }),
      );
    }

    for (let facility of facilities) {
      newMap[facility.y][facility.x] = {
        type: FACILITY,
        width: 1,
        height: 1,
      };
    }

    setBoard(newMap);
  }, [seatId, facilities]);

  const transformWidth = (col, length) => {
    if (col.type === ROOM) {
      if (col.width === 0) return `0px`;
      else
        return `${
          ((size - (length - 1) * 4) / length) * col.width + 4 * (col.width - 1)
        }px`;
    } else return `${(size - (length - 1) * 4) / length}px`;
  };

  const transformHeight = (col, length) => {
    if (col.type === ROOM) {
      if (col.width === 0) return `0px`;
      else
        return `${
          ((size - (length - 1) * 4) / length) * col.height +
          4 * (col.height - 1)
        }px`;
    } else return `${(size - (length - 1) * 4) / length}px`;
  };

  const itemStyle = type => {
    // 빈 좌석
    if (type === EMPTY)
      return {
        backgroundColor: 'rgb(245, 245, 245)',
        borderRadius: '4px',
      };
    // 좌석
    else if (type === SEAT)
      return {
        backgroundColor: '#99D98C',
        color: '#fff',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    // 회의실
    else if (type === ROOM)
      return {
        backgroundColor: '#E5E5E5',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    // 회의실
    else if (type === FACILITY)
      return {
        backgroundColor: '#E5E5E5',
        borderRadius: '4px',
      };
    // 검색한 좌석
    else if (type === SELECTION)
      return {
        backgroundColor: '#eb6767',
        color: '#fff',
        borderRadius: '4px',
      };
  };

  const Item = ({ board }) => {
    return board.map((row, y) =>
      row.map((col, x) => {
        return (
          <div
            key={x + y * row.length}
            style={{
              ...itemStyle(col.type),
              position: 'absolute',
              width: transformWidth(col, floor.width),
              height: transformHeight(col, floor.width),
              left: `${
                x * ((size - (floor.width - 1) * 4) / floor.width) + 4 * x
              }px`,
              top: `${
                y * ((size - (floor.width - 1) * 4) / floor.width) + 4 * y
              }px`,
            }}
          >
            {col.name}
          </div>
        );
      }),
    );
  };

  const Board = () => {
    return (
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            width: `${size}px`,
            height: `360px`,
            position: 'relative',
          }}
        >
          <Item board={board} />
        </div>
      </div>
    );
  };

  return <Board board={board} />;
};
