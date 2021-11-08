import React, { useState, useEffect } from 'react';
import * as BiIcons from 'react-icons/bi';

import UserTable from './a4_userTable';
import '../assets/styles/a4_userSearchBar.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const UserSearchBar = () => {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    const asd = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setData(json);
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
    <div className="userSearchBar">
      <div class="userSearchBarMiddle">
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

      <div class="userSearchBarBottom">
        <UserTable data={search(data)} />
      </div>
    </div>
  );
};

export default UserSearchBar;
