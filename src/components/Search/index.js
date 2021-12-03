import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';

import { Minimap } from './Minimap';
import MobileNavBar from '../u_m_navBar';

import '../../assets/styles/u6_search.css';

export const Search = () => {
  const [cookie] = useCookies(['access_token']);

  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState(null);
  const [seatReservation, setSeatReservation] = useState(null);
  const [roomReservation, setRoomReservation] = useState(null);

  const [userId, setUserId] = useState(0);
  const [open, setOpen] = useState(false);

  const navClick = () => {
    setOpen(!open);
  };

  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

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

  return (
    <div className={isPc ? 'search-user-box' : 'm-search-user-box'}>
      <div
        className={isPc ? 'search-user-input-bar' : 'm-search-user-input-bar'}
      >
        <Select
          menuPosition={'center'}
          options={users.map(user => ({
            value: user.id,
            label: `${user.name} / ${user.department} / ${user.position}`,
          }))}
          placeholder="검색할 사용자의 정보를 입력해주세요."
          onChange={e => setUserId(e.value)}
          noOptionsMessage={() => '검색 결과가 없습니다.'}
        />
      </div>
      <div className={isPc ? 'u6-user-detail' : 'm-u6-user-detail'}>
        <div className={isPc ? 'u6-left' : 'm-u6-left'}>
          {searchUser && (
            <div>
              <div className="u6-user-detail-text">
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '1.6em' }}>
                    {searchUser.name}{' '}
                  </span>
                  님
                </div>
                {roomReservation ? (
                  <div className="u6-user-status">회의중</div>
                ) : (
                  ''
                )}
              </div>
              <div className="u6-user-detail-table">
                <Table>
                  <tbody>
                    {searchUser && (
                      <>
                        <tr>
                          <th>사원 번호</th>
                          <td>{searchUser.employeeId}</td>
                        </tr>

                        <tr>
                          <th>부서</th>
                          <td>{searchUser.department}</td>
                        </tr>
                        <tr>
                          <th>직책</th>
                          <td>{searchUser.position}</td>
                        </tr>
                        <tr>
                          <th>이메일</th>
                          <td>{searchUser.email}</td>
                        </tr>
                        <tr>
                          <th>연락처</th>
                          <td>{searchUser.tel}</td>
                        </tr>
                      </>
                    )}
                    {seatReservation && (
                      <tr>
                        <th>좌석 위치</th>
                        <td>{`${seatReservation.seat.floor.name} - ${seatReservation.seat.name}`}</td>
                      </tr>
                    )}
                    {roomReservation && (
                      <tr>
                        <th>회의실 위치</th>
                        <td>{`${roomReservation.room.floor.name} - ${roomReservation.room.name}`}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </div>
        <div className={isPc ? 'u6-right' : 'm-u6-right'}>
          {seatReservation ? (
            <Minimap
              size={window.innerWidth}
              seatId={seatReservation.seat.id}
              roomId={roomReservation ? roomReservation.room.id : null}
              floorId={seatReservation.seat.floor.id}
            />
          ) : searchUser ? (
            <div className="u6-no-seat">
              <p>사용자가 사용중인 좌석이 이곳에 보여집니다.</p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
