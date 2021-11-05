import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InN0cmluZyIsInJvbGUiOjAsImlhdCI6MTYzNjA4OTk0OSwiZXhwIjoxNjM2MTc2MzQ5fQ.gWk0A9ljaz1YS6SN-U_31tpGe3TdWKN-wTtcq7tgh5U',
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
  // const userInfo = () => {
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].id == ID) {
  //       return i;
  //     }
  //   }
  // };
  return (
    <div className="u_userSearchForm">
      <div>
        <Select
          menuPosition={'center'}
          options={data.map(item => ({
            value: item.id,
            label: [item.department + '  ' + item.name + '  ' + item.position],
          }))}
          placeholder="회원 검색"
          onChange={e => handleChange(e.value)}
          noOptionsMessage={() => '검색 결과가 없습니다.'}
          className="u_userSearch"
          //value={selectedUser}
        />
      </div>
      <div className="userLocation">
        {data.map(item =>
          item.id == ID ? (
            <div>{item.name}의 위치.....(층이름, 좌석이름) </div>
          ) : (
            ''
          ),
        )}
      </div>
    </div>
  );
};
export default UserSearchForm;
