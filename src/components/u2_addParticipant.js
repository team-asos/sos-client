import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import * as AiIcon from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import '../assets/styles/u2_addParticipant.css';
import { useParams } from 'react-router';
//회의실 인원 검색해서 추가

const AddParticipant = ({ START, END, MAXUSER, ROOMID }) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const [cookie] = useCookies(['access_token']);
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [membersId, setMembersId] = useState([]);
  const [myId, setMyId] = useState();
  /*내 정보 */
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setMyId(json.id);
        });
    };
    res();
  }, []);
  /*참석자 선택 */
  const handleChange = e => {
    setSelectedMembers([...selectedMembers, e]); //멀티 아닐 때 근데 옵션에서 사라져야함
    // setSelectedMembers(e);
  };
  /*회원 검색 */
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/search`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setUsers(json);
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
          roomId: Number(ROOMID),
          userId: Number(myId),
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
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return i;
      }
    }
  };

  console.log(selectedMembers);
  return (
    <div className={isPc ? 'addAndButtonForm' : 'mAddAndButtonForm'}>
      <div className={isPc ? 'addParticipantForm' : 'mParticipantForm'}>
        <p className={isPc ? 'rrp_centerTextStyle' : 'mrrp_centerTextStyle'}>
          회의 참석자를 입력하세요. [ 사용 가능 인원 : {MAXUSER}명 ]
        </p>

        <div className={isPc ? 'searchForm' : 'mSearchForm'}>
          <Select
            menuPosition={'center'}
            options={users.map(item => ({
              value: item.id,
              label: [item.name, ' (', item.employeeId, ')'],
            }))}
            placeholder="회원 검색"
            onChange={e => handleChange(e)}
            // onInputChange={e => console.log(e)}
            noOptionsMessage={() => '검색 결과가 없습니다.'}
            isDisabled={selectedMembers.length < MAXUSER ? 0 : 1}
          />
        </div>
        <div className="participantForm">
          <Table
            striped
            hover
            className={isPc ? 'selectedMembersList' : 'mSelectedMembersList'}
          >
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
                  <td>{users[participantInfo(item.value)].name}</td>
                  <td>{users[participantInfo(item.value)].email}</td>
                  <td>{users[participantInfo(item.value)].department}</td>
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
      <div className={isMobile ? 'divButton' : ''}>
        <button
          className={isPc ? 'roomReservationBtn' : 'mRoomReservationBtn'}
          onClick={reservationClickHandler}
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default AddParticipant;
