import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import Select from 'react-select';

import {
  EMPTY,
  SEAT,
  ROOM,
  FACILITY,
  SELECTION,
  RESERVED_SEAT,
} from '../../const/object-type.const';

export const Search = () => {
  const [cookie] = useCookies(['access_token']);

  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState(null);
  const [seatReservation, setSeatReservation] = useState(null);
  const [roomReservation, setRoomReservation] = useState(null);

  const [userId, setUserId] = useState(0);

  const fetchUsers = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/users/search`,
      {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
          'Content-type': 'application/json',
        },
        method: 'GET',
      },
    );

    const json = await response.json();

    setUsers(json);
  }, [cookie.access_token]);

  const fetchReservations = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/search?status=1&userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
          'Content-type': 'application/json',
        },
        method: 'GET',
      },
    );

    const json = await response.json();

    setSeatReservation(json.find(j => j.seat !== null));
    setRoomReservation(json.find(j => j.room !== null));
  }, [cookie.access_token, userId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (userId !== 0) {
      setSearchUser(users.find(user => user.id === userId));
    }
  }, [userId, users]);

  useEffect(() => {
    if (userId !== 0) fetchReservations();
  }, [searchUser]);

  const pStyle = {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#820101',
    marginBottom: '0px',
  };

  /**
   * 미니맵
   */

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
    fetchFloor(1);
  }, []);

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
      newMap[seat.y][seat.x] = {
        type: SEAT,
        width: 1,
        height: 1,
      };
    }

    for (let room of rooms) {
      newMap[room.y][room.x] = {
        type: ROOM,
        width: room.width,
        height: room.height,
      };

      newMap = newMap.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex === room.x && rowIndex === room.y)
            return {
              type: ROOM,
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
  }, [facilities]);

  const transformWidth = (col, length) => {
    if (col.type === ROOM) {
      if (col.width === 0) return `0px`;
      else
        return `${
          ((window.innerWidth - (length - 1) * 4) / length) * col.width +
          4 * (col.width - 1)
        }px`;
      // else return `${length * 4 + 4 * (length - 1)}px`;
    } else return `${(window.innerWidth - (length - 1) * 4) / length}px`;

    // ${
    //   (window.innerWidth - (floor.width - 1) * 4) / floor.width
    // }
  };

  const transformHeight = (col, length) => {
    if (col.type === ROOM) {
      if (col.width === 0) return `0px`;
      else
        return `${
          ((window.innerWidth - (length - 1) * 4) / length) * col.height +
          4 * (col.height - 1)
        }px`;
      // else return `${length * 4 + 4 * (length - 1)}px`;
    } else return `${(window.innerWidth - (length - 1) * 4) / length}px`;

    // ${
    //   (window.innerWidth - (floor.width - 1) * 4) / floor.width
    // }
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
      return { backgroundColor: '#99D98C', color: '#fff', borderRadius: '4px' };
    // 회의실
    else if (type === ROOM)
      return {
        backgroundColor: '#E5E5E5',
        borderRadius: '4px',
      };
    // 검색한 좌석
    else if (type === 3)
      return {
        backgroundColor: 'red',
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
              // width: `${
              //   (window.innerWidth - (floor.width - 1) * 4) / floor.width
              // }px`,
              // height: `${
              //   (window.innerWidth - (floor.width - 1) * 4) / floor.width
              // }px`,
              left: `${
                x *
                  ((window.innerWidth - (floor.width - 1) * 4) / floor.width) +
                4 * x
              }px`,
              top: `${
                y *
                  ((window.innerWidth - (floor.width - 1) * 4) / floor.width) +
                4 * y
              }px`,
              // left: `${
              //   x *
              //     ((window.innerWidth - (floor.width - 1) * 4) / floor.width) +
              //   4 * x
              // }px`,
              // top: `${
              //   y *
              //     ((window.innerWidth - (floor.width - 1) * 4) / floor.width) +
              //   4 * y
              // }px`,
            }}
          ></div>
        );
      }),
    );
  };

  const Board = () => {
    return (
      <div
        style={{
          position: 'relative',
        }}
      >
        <Item board={board} />
      </div>
    );
  };

  return (
    <>
      <div>
        <Select
          menuPosition={'center'}
          options={users.map(user => ({
            value: user.id,
            label: `${user.name} / ${user.department} / ${user.position}`,
          }))}
          placeholder="검색할 정보를 입력해주세요."
          onChange={e => setUserId(e.value)}
          noOptionsMessage={() => '검색 결과가 없습니다.'}
        />
      </div>
      <div>
        {searchUser && <p style={pStyle}>회원 정보</p>}
        <Table>
          <tbody>
            {searchUser && (
              <>
                <tr>
                  <td>사원 번호</td>
                  <td>{searchUser.employeeId}</td>
                </tr>
                <tr>
                  <td>이름</td>
                  <td>
                    {roomReservation
                      ? `${searchUser.name} (회의중)`
                      : `${searchUser.name}`}
                  </td>
                </tr>
                <tr>
                  <td>부서</td>
                  <td>{searchUser.department}</td>
                </tr>
                <tr>
                  <td>직책</td>
                  <td>{searchUser.position}</td>
                </tr>
                <tr>
                  <td>이메일</td>
                  <td>{searchUser.email}</td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td>{searchUser.tel}</td>
                </tr>
              </>
            )}
            {seatReservation && (
              <tr>
                <td>좌석 위치</td>
                <td>{`${seatReservation.seat.floor.name} - ${seatReservation.seat.name}`}</td>
              </tr>
            )}
            {roomReservation && (
              <tr>
                <td>회의실 위치</td>
                <td>{`${roomReservation.room.floor.name} - ${roomReservation.room.name}`}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div>
        <Board board={board} />
      </div>
    </>
  );
};
