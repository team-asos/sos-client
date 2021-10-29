import React from 'react';
import Select from 'react-select';
import MembersData from '../assets/data/memberList';
import '../assets/styles/u5_userSearchForm.css';
//좌석 예약 페이지->직원 검색
class SeatStatusForm extends React.Component {
  render() {
    return (
      <div className="u_userSearchForm">
        <div>
          <Select
            menuPosition={'center'}
            options={MembersData.listData.map(item => {
              return {
                value: [item.name, item.email, item.tel],
                label: [item.name, item.email, item.tel],
              };
            })}
            placeholder="회원 검색"
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
