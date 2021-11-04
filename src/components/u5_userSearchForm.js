import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../assets/styles/u5_userSearchForm.css';
//좌석 예약 페이지->직원 검색
const UserSearchForm = () => {
  const [data, setData] = useState([]);
  const [ID, setID] = useState();

  const handleChange = value => {
    console.log('dkdk' + value);
    setID(value);
  };

  useEffect(() => {
    const res = async () => {
      //await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${}`, {
      await fetch('http://localhost:3000/users/11', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setData(json);
          console.log(json);
        });
    };
    res();
  }, []);
  console.log('여기' + data);
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
          // options={data.map(item => ({
          //   value: item.id,
          //   label: [item.department + '  ' + item.name + '  ' + item.position],
          // }))}
          placeholder="회원 검색"
          onChange={e => handleChange(e.value)}
          noOptionsMessage={() => '검색 결과가 없습니다.'}
          className="u_userSearch"
          //value={selectedUser}
        />
      </div>
      <div className="userLocation">
        {/* {data.map(item =>
          item.id == ID ? (
            <div>{item.name}의 위치.....(층이름, 좌석이름) </div>
          ) : (
            ''
          ),
        )} */}
      </div>
    </div>
  );
};
export default UserSearchForm;
