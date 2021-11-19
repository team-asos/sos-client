import React, { useState, useEffect } from 'react';

import './index.scss';

export const Board = ({ floor }) => {
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

  useEffect(() => {
    if (area.type === 0) {
      setBoard(originBoard);
    } else {
      let newMap = board;

      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex >= area.x && colIndex <= area.x + area.width)
            if (rowIndex >= area.y && rowIndex <= area.y + area.height)
              return 3;

          return col;
        }),
      );
      setBoard(newMap);
    }
  }, [area]);

  const handleSelection = (x, y) => {
    if (area.type === 0) {
      setArea({ ...area, x, y, type: 1 });
    } else if (area.type === 1) {
      setArea({
        ...area,
        width: Math.abs(x - area.x),
        height: Math.abs(y - area.y),
        type: 2,
      });
    } else if (area.type === 2) {
      setArea({ x: null, y: null, width: null, height: null, type: 0 });
    }
  };

  const Row = ({ row, y }) => {
    return row.map((item, index) => (
      <td
        className="board-content"
        onClick={() => {
          handleSelection(index, y);
        }}
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
            : item === 2
            ? {
                backgroundColor: 'blue',
              }
            : {
                backgroundColor: 'red',
              }
        }
      ></td>
    ));
  };

  const Rows = ({ board }) => {
    return board.map((row, index) => (
      <tr key={index}>
        <Row row={row} y={index} />
      </tr>
    ));
  };

  const Board = () => {
    return (
      <table className="board-table">
        <tbody>
          <Rows board={board} />
        </tbody>
      </table>
    );
  };

  /* --- Setting --- */
  const [tab, setTab] = useState(0);

  const SeatTab = () => {
    return (
      <div>
        {area.x}, {area.y}
      </div>
    );
  };

  const Tab = () => {
    if (tab === 0) return <SeatTab />;
    else if (tab === 1) return <div>회의실</div>;
    else if (tab === 2) return <div>시설</div>;
  };

  const Setting = () => {
    return (
      <div className="board-setting">
        <div className="setting-tab-group">
          <button onClick={() => setTab(0)}>좌석</button>
          <button onClick={() => setTab(1)}>회의실</button>
          <button onClick={() => setTab(2)}>시설</button>
        </div>
        <div className="setting-tab">
          <Tab />
        </div>
      </div>
    );
  };

  return (
    <div className="board-container">
      <Board />
      <Setting />
    </div>
  );
};
