import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import Select from 'react-select';

import { Minimap } from './Minimap';

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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <div>
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
      </div>
      {seatReservation && (
        <Minimap
          size={window.innerWidth}
          seatId={seatReservation.seat.id}
          floorId={seatReservation.seat.floor.id}
        />
      )}
    </div>
  );
};
