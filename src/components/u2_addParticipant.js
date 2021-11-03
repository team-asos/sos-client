import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import * as AiIcon from 'react-icons/ai';
import '../assets/styles/u2_addParticipant.css';
//회의실 인원 검색해서 추가

const AddParticipant = () => {
  //useEffect(()=>{},[])
  const [data, setData] = useState([
    //{
    //이렇게 정의 안하면 data[0].name 같이 못 불러오는 이유
    // createdAt: '',
    // deletedAt: null,
    // department: '',
    // email: '',
    // employeeId: '',
    // id: 1,
    // name: '',
    // position: '',
    // role: 0,
    // tel: '',
    // updatedAt: '',
    //},
  ]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handleChange = res => {
    setSelectedMembers(res);
    console.log(selectedMembers);
  };

  useEffect(() => {
    const res = () => {
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`, {
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
    console.log(selectedMembers);
  };
  console.log(data[4]);
  const participantInfo = id => {
    for (let i = 0; i < data.length; i++) {
      if (id == data[i].id) {
        console.log('이거랑 같음' + i);
        return i;
      }
    }
  };
  return (
    <div className="addParticipantForm">
      <p className="rrp_centerTextStyle">회의 참석자를 입력하세요.</p>

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
                {/*<td>{}</td>
                {/*<td>{data[() => participantInfo(item.id)].email}</td>
                <td>{data[() => participantInfo(item.id)].employeeId}</td> */}
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
