import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Table } from 'react-bootstrap';
import * as AiIcon from 'react-icons/ai';
import '../assets/styles/u2_addParticipant.css';
//회의실 인원 검색해서 추가

const AddParticipant = ({ START, END, MAXUSER, ROOMID }) => {
  const [data, setData] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [membersId, setMembersId] = useState([]);
  /*참석자 선택 */
  const handleChange = e => {
    setSelectedMembers(e);
  };
  /*회원 검색 */
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/search`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gOyngOybkCIsInJvbGUiOjAsImlhdCI6MTYzNjQ3MTQ2MywiZXhwIjoxNjM2NTU3ODYzfQ.n9OTcUPdHgdJ47vt2_jIAVmGZ8Rk5ndLb2TCLuHzkzI',
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setData(json);
        });
    };
    res();
  }, []);
  /*예약하기 */
  const reservationClickHandler = async () => {
    for (let i = 0; i < selectedMembers.length; i++) {
      //setMembersId(selectedMembers[i].value);
      membersId.push(selectedMembers[i].value);
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/room`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          startTime: START,
          endTime: END,
          status: 0, //물어보기
          roomId: Number(ROOMID),
          userId: 1,
          participantIds: membersId,
        }),
      },
    );
    if (response.status === 201) {
      alert('예약이 완료되었습니다.');
    } else {
      alert(response.status);
    }
  };
  /*마이너스 누르면 참석자 삭제 */
  const deleteParticipant = id => {
    setSelectedMembers(
      selectedMembers.filter(selectedMembers => selectedMembers.value !== id),
    );
  };
  /* id 접근 안돼서 만든 함수 */
  const participantInfo = id => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        return i;
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="addParticipantForm">
        <p className="rrp_centerTextStyle">
          회의 참석자를 입력하세요. (사용 가능 인원 : {MAXUSER}명)
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
            // onInputChange={e => console.log(e)}
            noOptionsMessage={() => '검색 결과가 없습니다.'}
            className="searchParticipant"
            value={selectedMembers}
            isDisabled={selectedMembers.length < MAXUSER ? 0 : 1}
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
      <div style={{ marginTop: '7vh', marginLeft: '10vw' }}>
        <button
          className="roomReservationBtn"
          onClick={reservationClickHandler}
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default AddParticipant;
