import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import { formatISO } from 'date-fns';
import { useMediaQuery } from 'react-responsive';

import '../assets/styles/u5_userSearchForm.css';
//좌석 예약 페이지->직원 검색
const UserSearchForm = () => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const now = formatISO(new Date());
  const [users, setUsers] = useState([]);
  const [ID, setID] = useState();
  const [cookie] = useCookies(['access_token']);
  const [userReservation, setUserReservation] = useState([]);
  const [userLocation, setUserLocation] = useState({
    seatFloor: '',
    roomFloor: '',
    seatLocation: '',
    roomLocation: '',
    seatStatus: '',
    roomStatus: '',
  });
  /*검색한 직원의 ID */
  const handleChange = value => {
    setID(value);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/search`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
          'Content-type': 'application/json',
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setUsers(json);
        });
    };
    fetchUsers();
  }, []);
  const fetchUserReservation = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/search?userId=${ID}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        setUserReservation(json);
      });
  };
  const search = () => {
    userReservation.map(item => {
      if (item.room === null && item.status === 1) {
        if (item.endTime === null) {
          setUserLocation({
            seatFloor: item.seat.floor.name,
            seatLocation: item.seat.name,
            seatStatus: '사용중',
          });
        }
      }
      if (item.status === 1 && item.room != null) {
        if (item.endTime >= now) {
          setUserLocation({
            roomFloor: item.room.floor.name,
            roomLocation: item.room.name,
            roomStatus: '미팅중',
          });
        }
      }
    });
  };
  useEffect(() => {
    if (ID !== undefined) {
      fetchUserReservation();
    }
  }, [ID]);
  useEffect(() => {
    if (userReservation !== undefined) {
      search();
    }
  }, [userReservation]);
  return (
    <div className={isPc ? 'u_userSearchForm' : 'm_userSearchForm'}>
      <div className={isPc ? 'searchUserTextStyle' : 'm_searchUserTextStyle'}>
        <hr></hr>직원 검색
      </div>
      <div>
        <Select
          menuPosition={'center'}
          options={users.map(item => ({
            value: item.id,
            label: [item.department + '  ' + item.name + '  ' + item.position],
          }))}
          placeholder="이름을 입력해주세요."
          onChange={e => handleChange(e.value)}
          noOptionsMessage={() => '검색 결과가 없습니다.'}
          className="u_userSearch"
          //value={selectedUser}
        />
      </div>
      <div className="userLocation">
        {users.map(item =>
          item.id === ID ? (
            <>
              <Table striped hover className="userLocationInfo">
                <thead>
                  <tr>
                    <th></th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>부서</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.department}</td>
                  </tr>
                </tbody>
              </Table>
              <Table striped hover className="userLocationInfo">
                <thead>
                  <tr>
                    <th></th>
                    <th>층</th>
                    <th>좌석 위치</th>
                    <th>이용 상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>{userLocation.seatFloor}</td>
                    <td>{userLocation.seatLocation}</td>
                    <td>{userLocation.seatStatus}</td>
                  </tr>
                </tbody>
              </Table>
              <Table striped hover className="userLocationInfo">
                <thead>
                  <tr>
                    <th></th>
                    <th>층</th>
                    <th>회의실 위치</th>
                    <th>이용 상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>{userLocation.roomFloor}</td>
                    <td>{userLocation.roomLocation}</td>
                    <td>{userLocation.roomStatus}</td>
                  </tr>
                </tbody>
              </Table>
            </>
          ) : null,
        )}
      </div>
    </div>
  );
};
export default UserSearchForm;
