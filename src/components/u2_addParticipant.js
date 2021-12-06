import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCookies } from 'react-cookie';
import { Table, Dropdown } from 'react-bootstrap';
import * as AiIcon from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import RoomTimeTable from './u2_roomTimeTable';

import '../assets/styles/u2_addParticipant.css';
//회의실 인원 검색해서 추가
const AddParticipant = ({
  START,
  END,
  MAXUSER,
  ROOMID,
  selectedDate,
  deleteClick,
}) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const [cookie] = useCookies(['access_token']);
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [membersId, setMembersId] = useState([]);
  const [myId, setMyId] = useState();
  const [startTime, setStartTime] = useState(''); //요청시 보낼 날짜 문자열
  const [endTime, setEndTime] = useState(''); //요청시 보낼 날짜 문자열
  const [start, setStart] = useState('시작'); //props로 받아온 START 저장할 변수
  const [end, setEnd] = useState('종료'); //props로 받아온 END 저장할 변수
  const [topic, setTopic] = useState(''); //회의 주제
  const res = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      },
    );

    const authJson = await response.json();

    setMyId(authJson.id);

    await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/search`, {
      headers: {
        Authorization: `Bearer ${cookie.access_token}`,
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setUsers(json.filter(user => user.id !== authJson.id));
      });
  };
  /*내 정보 */
  useEffect(() => {
    res();
  }, []);
  const handleChange = e => {
    setUsers(users.filter(user => user.id !== e.value));
    setSelectedMembers([
      ...selectedMembers,
      users.find(user => user.id === e.value),
    ]);
  };
  /*테이블에서 선택한 시간으로 예약할 때 */
  const getStartTime = () => {
    setStart(START);
    setStartTime(selectedDate.slice(0, 11) + START);
  };
  const getEndTime = () => {
    setEnd(END);
    setEndTime(selectedDate.slice(0, 11) + END);
  };

  useEffect(() => {
    if (START === '시작') setStart(START);
    else if (START !== null) getStartTime();
  }, [START]);
  useEffect(() => {
    if (END === '종료') setEnd(END);
    else if (END !== null) getEndTime();
  }, [END]);
  useEffect(() => {
    setStart('시작');
    setEnd('종료');
  }, [selectedDate]);
  /*예약하기 */
  const reservationClickHandler = async () => {
    if (startTime.length <= 11 || endTime.length <= 11) {
      alert('시간을 선택해주세요.');
      return;
    }
    if (topic.length === 0) {
      alert('회의 주제를 입력해주세요.');
      return;
    }

    for (let i = 0; i < selectedMembers.length; i++) {
      membersId.push(selectedMembers[i].id);
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/room`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          startTime: startTime,
          endTime: endTime,
          userId: Number(myId),
          roomId: Number(ROOMID),
          participantIds: membersId,
          topic,
        }),
      },
    );
    if (response.status === 201) {
      alert('예약이 완료되었습니다.');
      window.location.href = `/room-reservation/${ROOMID}`;
    } else {
      alert(response.status);
    }
  };
  /*마이너스 누르면 참석자 삭제 */
  const deleteParticipant = user => {
    setSelectedMembers(
      selectedMembers.filter(selectedMembers => selectedMembers.id !== user.id),
    );
    users.push(user);
  };

  /*선택취소 눌렸을 때 초기화 */
  const deleteClicked = () => {
    setStart('시작');
    setEnd('종료');
    setStartTime('');
    setEndTime('');
  };
  useEffect(() => {
    if (deleteClick) deleteClicked();
  }, [deleteClick]);
  const inputTopic = e => {
    setTopic(e.target.value);
  };

  return (
    <div className={isPc ? 'roomReservationFormRight' : ''}>
      {isPc ? (
        <div className={isPc ? 'selectedTime' : 'm_selectedTime'}>
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className={isPc ? 'dropDownToggle' : 'm_dropDownToggle'}
              disabled={true}
            >
              {start}
            </Dropdown.Toggle>
          </Dropdown>
          <p style={{ marginRight: '8%', marginLeft: '8%' }}>~</p>
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className={isPc ? 'dropDownToggle' : 'm_dropDownToggle'}
              disabled={true}
            >
              {end}
            </Dropdown.Toggle>
          </Dropdown>
        </div>
      ) : null}
      <div className={isPc ? 'meetingTopicForm' : 'm_meetingTopicForm'}>
        <input
          className={isPc ? 'topicInput' : 'm_topicInput'}
          onChange={inputTopic}
          placeholder="회의 주제를 입력해주세요."
        ></input>
      </div>
      <div className={isPc ? 'addAndButtonForm' : 'mAddAndButtonForm'}>
        <div className={isPc ? 'addParticipantForm' : 'mParticipantForm'}>
          <p className={isPc ? 'rrp_centerTextStyle' : 'mrrp_centerTextStyle'}>
            회의 참석자를 입력하세요. [ 추가 가능 인원 : {MAXUSER - 1}명 ]
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
              noOptionsMessage={() => '검색 결과가 없습니다.'}
              isDisabled={selectedMembers.length < MAXUSER - 1 ? 0 : 1}
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
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.department}</td>
                    <td>
                      <AiIcon.AiOutlineMinus
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => deleteParticipant(item)}
                      ></AiIcon.AiOutlineMinus>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        {isPc ? (
          <div className={isMobile ? 'divButton' : ''}>
            <button
              className={isPc ? 'roomReservationBtn' : 'mRoomReservationBtn'}
              onClick={reservationClickHandler}
            >
              예약하기
            </button>
          </div>
        ) : null}
      </div>
      {isPc ? null : (
        <RoomTimeTable
          selectedDate={selectedDate}
          roomId={ROOMID}
          selectedMembers={selectedMembers}
          myId={myId}
          membersId={membersId}
          topic={topic}
          setStart={setStart}
          setEnd={setEnd}
        />
      )}
    </div>
  );
};

export default AddParticipant;
