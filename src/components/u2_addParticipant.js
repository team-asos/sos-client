import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import '../assets/styles/u2_addParticipant.css';
import '../assets/data/memberList';
import MembersData from '../assets/data/memberList';
//회의실 인원 검색해서 추가

const AddParticipant = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleChange = selectedMembers => {
    setSelectedMembers(selectedMembers => [...selectedMembers]);
    console.log(setSelectedMembers + ' : ' + selectedMembers);
  };

  return (
    <div>
      <div className="searchForm">
        <Select
          menuPosition={'center'}
          isMulti
          options={MembersData.listData.map(item => {
            return { value: item.name, label: item.name };
          })}
          placeholder="회원 검색"
          onChange={e => handleChange(e)}
          noOptionsMessage={() => '검색 결과가 없습니다.'}
          className="searchParticipant"
        />
      </div>
      <div className="participantForm"></div>
    </div>
  );
};

export default AddParticipant;
