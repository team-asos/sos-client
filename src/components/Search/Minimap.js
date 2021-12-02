import React, { useState, useEffect } from 'react';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
} from '../../const/object-type.const';

export const Minimap = ({ size, seatId, roomId, floorId }) => {
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
            return { type: 0, name: '', width: 1, height: 1, select: false };
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
          type: SEAT,
          name: seat.name,
          width: 1,
          height: 1,
          select: true,
        };
      else
        newMap[seat.y][seat.x] = {
          type: SEAT,
          name: seat.name,
          width: 1,
          height: 1,
          select: false,
        };
    }

    for (let room of rooms) {
      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex === room.x && rowIndex === room.y) {
            if (room.id === roomId)
              return {
                type: ROOM,
                name: room.name,
                width: room.width,
                height: room.height,
                select: true,
              };
            else
              return {
                type: ROOM,
                name: room.name,
                width: room.width,
                height: room.height,
                select: false,
              };
          } else if (colIndex >= room.x && colIndex < room.x + room.width)
            if (rowIndex >= room.y && rowIndex < room.y + room.height)
              return {
                type: ROOM,
                name: '',
                width: 0,
                height: 0,
                select: false,
              };

          return col;
        }),
      );
    }

    for (let facility of facilities) {
      newMap[facility.y][facility.x] = {
        type: FACILITY,
        name: `/images/${facility.type}.png`,
        width: 1,
        height: 1,
        select: false,
      };
    }

    setBoard(newMap);
  }, [seatId, facilities]);

  const transformLength = (type, length) => {
    if (type === ROOM) {
      if (length === 0) return `0px`;
      else return `${length * 40 + 4 * (length - 1)}px`;
    } else return `${length * 40}px`;
  };

  const itemStyle = (type, select) => {
    // 검색한 좌석
    if (select)
      return {
        backgroundColor: '#eb6767',
        color: '#fff',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

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
  };

  const Item = ({ board }) => {
    return board.map((row, y) =>
      row.map((col, x) => {
        return (
          <div
            key={x + y * row.length}
            style={{
              ...itemStyle(col.type, col.select),
              position: 'absolute',
              width: transformLength(col.type, col.width),
              height: transformLength(col.type, col.height),
              left: `${x * 40 + x * 4}px`,
              top: `${y * 40 + y * 4}px`,
            }}
          >
            {col.type === FACILITY ? (
              <img
                style={{ width: '100%', height: '100%', opacity: '60%' }}
                src={col.name}
                alt=""
              />
            ) : (
              col.name
            )}
          </div>
        );
      }),
    );
  };

  const Board = () => {
    return (
      <div
        style={{
          height: '100%',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            marginRight: '10px',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: `24px`,
              height: `24px`,
              backgroundColor: '#eb6767',
              borderRadius: '4px',
              marginRight: '4px',
            }}
          ></div>
          현재 위치
        </div>
        <div
          style={{
            overflow: 'auto',
            height: '90%',
            margin: '0 10px',
          }}
        >
          <div
            style={{
              width: `${size}px`,
              height: '100%',
              position: 'relative',
            }}
          >
            <Item board={board} />
          </div>
        </div>
      </div>
    );
  };

  return <Board board={board} />;
};
