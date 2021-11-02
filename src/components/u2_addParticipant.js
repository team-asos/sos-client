import React from 'react';
import Select from 'react-select';

import '../assets/styles/u2_addParticipant.css';
import '../assets/data/memberList';
import MembersData from '../assets/data/memberList';
//회의실 인원 검색해서 추가

class AddParticipant extends React.Component {
  state = {
    selectedMembers: [],
  };
  handleChange = selectedMembers => {
    this.setState({ selectedMembers });
    console.log(selectedMembers);
  };

  useEffect(()=>{},[])
  
  render() {
    const { selectedMembers } = this.state;
    return (
      <div>
        <div className="searchForm">
          <Select
            menuPosition={'center'}
            options={MembersData.listData.map(item => {
              return { value: item.name, label: item.name };
            })}
            placeholder="회원 검색"
            onChange={e => this.handleChange(e)}
            noOptionsMessage={() => '검색 결과가 없습니다.'}
            isMulti
            className="searchParticipant"
          />
        </div>
        <div className="participantForm">
          <p></p>
        </div>
      </div>
    );
  }
}

export default AddParticipant;
