import React from 'react';
import Select from 'react-select';
import MembersData from '../assets/data/memberList';
import '../assets/styles/u5_userSearchForm.css';
class SeatStatusForm extends React.Component {
  render() {
    return (
      <div className="u_userSearchForm">
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
            className="u_userSearch"
          />
        </div>
      </div>
    );
  }
}
export default SeatStatusForm;
