import React, { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import Select from 'react-select';
import { Accordion, Table } from 'react-bootstrap';

export const Search = () => {
  const [cookie] = useCookies(['access_token']);

  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState(null);
  const [seatReservation, setSeatReservation] = useState(null);
  const [roomReservation, setRoomReservation] = useState(null);

  const [userId, setUserId] = useState(0);

  const userHeadings = ['이름', '부서', '직책'];
  const seatHeadings = ['층', '이름'];
  const roomHeadings = ['층', '이름', '주제'];

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
    marginBottom: '1vh',
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
        {/* {searchUser && (
          <>
            <p style={pStyle}>회원 정보</p>
            <Table>
              <thead>
                <tr>
                  {userHeadings.map((userHeading, index) => (
                    <th key={index}>{userHeading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{searchUser.name}</td>
                  <td>{searchUser.department}</td>
                  <td>{searchUser.position}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}

        {seatReservation && (
          <>
            <p style={pStyle}>좌석 정보</p>
            <Table>
              <thead>
                <tr>
                  {seatHeadings.map((seatHeading, index) => (
                    <th key={index}>{seatHeading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{seatReservation.seat.floor.name}</td>
                  <td>{seatReservation.seat.name}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}

        {roomReservation && (
          <>
            <p style={pStyle}>회의실 정보</p>
            <Table>
              <thead>
                <tr>
                  {roomHeadings.map((roomHeading, index) => (
                    <th key={index}>{roomHeading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{roomReservation.room.floor.name}</td>
                  <td>{roomReservation.room.name}</td>
                  <td>{roomReservation.room.topic}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )} */}
      </div>
    </>
  );
};
