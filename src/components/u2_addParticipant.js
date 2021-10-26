import React from 'react';
import Select from 'react-select';

import '../assets/styles/u2_addParticipant.css';
import '../assets/data/memberList';
import MembersData from '../assets/data/memberList';

const AddParticipant = () => {
  /*const options = [
    /*{ value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },*/
  /*{
      value: MembersData.listData[0].name,
      label: MembersData.listData[0].name,
    },
  ];*/
  /*const onchange = userName => {
    return console.log(userName);
  };*/

  return (
    <div>
      <Select
        menuPosition={'center'}
        options={MembersData.listData.map(item => {
          return { value: item.name, label: item.name };
        })}
        placeholder="회원 검색"
        //onChange={onchange.bind(this)}
        onChange={e => {
          console.log(e);
        }}
        noOptionsMessage={() => '검색 결과가 없습니다.'}
        isMulti
        className="searchParticipant"
      />
    </div>
  );
};
export default AddParticipant;
