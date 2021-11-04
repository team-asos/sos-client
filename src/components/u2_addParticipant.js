import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import * as AiIcon from 'react-icons/ai';
import '../assets/styles/u2_addParticipant.css';
//회의실 인원 검색해서 추가

const AddParticipant = () => {
  //useEffect(()=>{},[])
  const maxMember = 5; //db연결해야함
  const [data, setData] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handleChange = res => {
    setSelectedMembers(res);
  };

  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setData(json);
        });
    };
    res();
    // setData(result.json);
    // .then(response => response.json())
    // .then(json => setData(json));
  }, []);
  const deleteParticipant = id => {
    setSelectedMembers(
      selectedMembers.filter(selectedMembers => selectedMembers.value !== id),
    );
  };

  const participantInfo = id => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        return i;
      }
    }
  };
  return (
    <div className="addParticipantForm">
      <p className="rrp_centerTextStyle">
        회의 참석자를 입력하세요. (사용 가능 인원 : {maxMember}명)
      </p>

      <div className="searchForm">
        <Select
          menuPosition={'center'}
          isMulti
          options={data.map(item => ({
            value: item.id,
            label: [item.name, ' (', item.employeeId, ')'],
          }))}
          placeholder="회원 검색"
          onChange={e => handleChange(e)}
          noOptionsMessage={() => '검색 결과가 없습니다.'}
          className="searchParticipant"
          value={selectedMembers}
          isDisabled={selectedMembers.length < maxMember ? 0 : 1}
        />
      </div>
      <div className="participantForm">
        <Table striped hover className="selectedMembersList">
          <thead>
            <tr>
              <th></th>
              <th>이름</th>
              <th>이메일</th>
              <th>부서</th>
            </tr>
          </thead>
          <tbody>
            {selectedMembers.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{data[participantInfo(item.value)].name}</td>
                <td>{data[participantInfo(item.value)].email}</td>
                <td>{data[participantInfo(item.value)].department}</td>
                <td>
                  <AiIcon.AiOutlineMinus
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => deleteParticipant(item.value)}
                  ></AiIcon.AiOutlineMinus>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddParticipant;
