import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import * as moment from 'moment';

import '../assets/styles/u5_userSearchForm.css';
//좌석 예약 페이지->직원 검색
const UserSearchForm = ({ getUserId }) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const now = moment(new Date()).format('HH:mm');
  const [users, setUsers] = useState([]);
  const [ID, setID] = useState();
  const [cookie] = useCookies(['access_token']);
  const [userReservation, setUserReservation] = useState([]);
  const [userSeatLocation, setUserSeatLocation] = useState({
    seatFloor: '',
    seatLocation: '',
  });
  const [userRoomLocation, setUserRoomLocation] = useState({
    roomFloor: '',
    roomLocation: '',
    roomTopic: '',
  });
  /*검색한 직원의 ID */
  const handleChange = value => {
    setID(value);
  };
  const resetSearchUser = () => {
    setUserSeatLocation({
      seatFloor: '',
      seatLocation: '',
    });
    setUserRoomLocation({
      roomFloor: '',
      roomLocation: '',
      roomTopic: '',
    });
  };
  useEffect(() => {
    resetSearchUser();
  }, [userReservation]);
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
        getUserId(json);
      });
  };
  const search = () => {
    userReservation.map(item => {
      if (item.room === null && item.status === 1) {
        if (item.endTime === null) {
          setUserSeatLocation({
            seatFloor: item.seat.floor.name,
            seatLocation: item.seat.name,
          });
        }
      }
      if (item.status === 1 && item.room) {
        if (item.endTime >= now) {
          setUserRoomLocation({
            roomFloor: item.room.floor.name,
            roomLocation: item.room.name,
            roomTopic: item.topic,
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
      <div style={{ marginBottom: '2vh' }}>
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
              <div className="searchUserInfoText">회원 정보</div>
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
              <div className="searchUserInfoText">좌석</div>

              <Table striped hover className="userLocationInfo">
                <thead>
                  <tr>
                    <th></th>
                    <th>층</th>
                    <th>이름</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>{userSeatLocation.seatFloor}</td>
                    <td>{userSeatLocation.seatLocation}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="searchUserInfoText">회의실</div>
              <Table striped hover className="userLocationInfo">
                <thead>
                  <tr>
                    <th></th>
                    <th>층</th>
                    <th>이름</th>
                    <th>회의 주제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>{userRoomLocation.roomFloor}</td>
                    <td>{userRoomLocation.roomLocation}</td>
                    <td>{userRoomLocation.roomTopic}</td>
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
