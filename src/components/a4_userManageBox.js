import React, { useState, useEffect } from 'react';
import * as BiIcons from 'react-icons/bi';
import { useCookies } from 'react-cookie';

import UserTable from './a4_userTable';

import '../assets/styles/a4_userManageBox.css';

const UserManageBox = () => {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [cookie] = useCookies('access_token');

  useEffect(() => {
    const asd = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/search`, {
        headers: { Authorization: `Bearer ${cookie.access_token}` },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setData(json.filter(j => j.role === 0));
        });
    };
    asd();
  }, []);

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter(row =>
      columns.some(column =>
        row[column] === null
          ? ''
          : row[column].toString().toLowerCase().indexOf(q) > -1,
      ),
    );
  }
  return (
    <div className="userManageBox">
      {/* 위, 텍스트 부분 */}
      <div className="userManageUpperBox">
        <div>
          <p>사용자 관리</p>
        </div>
        <div className="userManageUpperBoxChild">
          <input
            type="text"
            className="userSearchInput"
            placeholder="  검색할 사용자를 입력하세요."
            value={q}
            onChange={e => setQ(e.target.value)}
          />

          {/* 돋보기 클릭 시, 필터링 된 리스트 불러오기 */}
          <BiIcons.BiSearchAlt2
            size={25}
            className="searchIcon"
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </div>
      {/* 아래,  부분 */}
      <div className="userManageBottomBox">
        {/* <div>{search(data).length && <UserTable data={search(data)} />}</div> */}
        <UserTable data={search(data)} />
      </div>
    </div>
  );
};

export default UserManageBox;
