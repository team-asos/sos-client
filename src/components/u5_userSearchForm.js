import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import * as MdIcon from 'react-icons/md';
import '../assets/styles/u5_userSearchForm.css';
//좌석 예약 페이지->직원 검색
const UserSearchForm = () => {
  const [data, setData] = useState([]);
  const [ID, setID] = useState();

  const handleChange = value => {
    setID(value);
  };

  useEffect(() => {
    const res = async () => {
      //await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${}`, {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/search`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gOyngOybkCIsInJvbGUiOjAsImlhdCI6MTYzNjQ3MTQ2MywiZXhwIjoxNjM2NTU3ODYzfQ.n9OTcUPdHgdJ47vt2_jIAVmGZ8Rk5ndLb2TCLuHzkzI',
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setData(json);
        });
    };
    res();
  }, []);

  return (
    <div className="u_userSearchForm">
      <div className="searchUserTextStyle">
        <hr></hr>직원 검색
      </div>
      <div>
        <Select
          menuPosition={'center'}
          options={data.map(item => ({
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
        {data.map(item =>
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
                    <td>1층</td>
                    <td>좌석/회의실 이름</td>
                    <td>사용중/미팅중/퇴실?</td>
                  </tr>
                </tbody>
              </Table>
            </>
          ) : (
            ''
          ),
        )}
      </div>
    </div>
  );
};
export default UserSearchForm;
