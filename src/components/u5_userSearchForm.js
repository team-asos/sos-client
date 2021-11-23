import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import '../assets/styles/u5_userSearchForm.css';
//좌석 예약 페이지->직원 검색
const UserSearchForm = () => {
  const [users, setUsers] = useState([]);
  const [ID, setID] = useState();
  const [cookie] = useCookies(['access_token']);
  const [userReservation, setUserReservation] = useState([]);
  const [userLocation, setUserLocation] = useState({
    floor: '', //층 이름
    location: '', //좌석이름/회의실이름
    status: '', //사용중/미팅중
    floorId: 0,
    seatId: 0,
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
        json.map(item => {
          if (item.status === 1 && item.room == null) {
            setUserLocation({
              floor: item.seat.floor.name,
              location: item.seat.name,
              status: '사용중',
              floorId: item.seat.floor.id,
              seatId: item.seat.id,
            });
          }
          if (item.status === 1 && item.room != null) {
            setUserLocation({
              floor: item.room.floor.name,
              location: item.room.name,
              status: '미팅중',
            });
          } else if (item.status === 0 || item.status === 2) {
            setUserLocation({
              floor: '', //층 이름
              location: '',
              status: '퇴근',
            });
          }
        });
      });
  };
  useEffect(() => {
    if (ID !== undefined) {
      fetchUserReservation();
    }
  }, [ID]);
  return (
    <div className="u_userSearchForm">
      <div className="searchUserTextStyle">
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
                    <th>위치</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>{userLocation.floor}</td>
                    <td>{userLocation.location}</td>
                    <td>{userLocation.status}</td>
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
