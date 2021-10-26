import React, { useState } from 'react';
import * as BiIcons from 'react-icons/bi';

import membersData from '../assets/data/memberList';
import '../assets/styles/a4_userSearchBar.css';

const UserSearchBar = () => {
  const [filter, setFilter] = useState('');

  const searchText = event => {
    setFilter(event.target.value);
  };

  let dataSearch = membersData.listData.filter(item => {
    return Object.keys(item).some(key =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase()),
    );
  });
  return (
    <div className="userSearchBar">
      <div class="userSearchBarUpper">
        <p>검색 필터</p>
        {/* 값을 줘서 처리할 예정, 초기 설정은 이름으로 & 필터링없이도 가능하게? */}
        <button>이름</button>
        <button>이메일</button>
        <button>직급</button>
        <button>부서</button>
      </div>

      <div class="userSearchBarMiddle">
        <input
          type="text"
          placeholder="  검색 필터 설정 후, 검색어를 입력하세요"
          value={filter}
          onChange={searchText.bind(this)}
          className="userSearchInput"
        />

        {/* 돋보기 클릭 시, 필터링 된 리스트 불러오기 */}
        <BiIcons.BiSearchAlt2
          size={25}
          className="searchIcon"
          onClick={searchText.bind(this)}
        />
      </div>

      <div class="userSearchBarBottom">
        {dataSearch.map((item, index) => {
          return (
            <div class="eachMemberInfo">
              <div class="information">
                <p>
                  {item.name} | {item.email} | {item.tel} | {item.dept} |{' '}
                  {item.job}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSearchBar;
