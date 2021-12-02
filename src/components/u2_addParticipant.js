import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCookies } from 'react-cookie';
import { Table, Dropdown } from 'react-bootstrap';
import * as AiIcon from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import * as moment from 'moment';
import '../assets/styles/u2_addParticipant.css';
//회의실 인원 검색해서 추가
const AddParticipant = ({
  START,
  END,
  MAXUSER,
  ROOMID,
  selectedDate,
  timeTable,
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
  const [isSelected, setIsSelected] = useState([0]);
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
    setUsers(users.filter(user => user.id !== e.value));
    setSelectedMembers([
      ...selectedMembers,
      users.find(user => user.id === e.value),
    ]);
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
    for (let i = 0; i < selectedMembers.length; i++) {
      //setMembersId(selectedMembers[i].value);
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
  /*드롭다운에서 선택 했을 때 예약할 때 보낼 값 */
  const setStartThisClick = dropDownStartTime => {
    setStart(dropDownStartTime); //드롭다운 value 값 변경하기 위해
    setStartTime(
      //예약할 때 보내기 위해 문자열 변환
      selectedDate.slice(0, 11) + dropDownStartTime,
    );
  };
  const setEndThisClick = dropDownEndTime => {
    setEnd(dropDownEndTime); //드롭다운 value 값 변경하기 위해
    setEndTime(selectedDate.slice(0, 11) + dropDownEndTime); //예약할 때 보내기 위해 문자열 변환
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
    <div className="roomReservationFormRight">
      <div className="selectedTime">
        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className={isPc ? 'dropDownToggle' : 'm_dropDownToggle'}
            disabled="true"
          >
            {start}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ height: '40vh', overflow: 'auto' }}>
            <Dropdown.Item onClick={() => setStart('시작')}>
              선택 안함
            </Dropdown.Item>
            {timeTable.map((time, idx) => (
              <Dropdown.Item onClick={() => setStartThisClick(time.start_time)}>
                {time.start_time}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <p style={{ marginRight: '8%', marginLeft: '8%' }}>~</p>
        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className={isPc ? 'dropDownToggle' : 'm_dropDownToggle'}
            disabled="true"
          >
            {end}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ height: '40vh', overflow: 'auto' }}>
            <Dropdown.Item onClick={() => setEnd('종료')}>
              선택 안함
            </Dropdown.Item>
            {timeTable.map((time, idx) => (
              <Dropdown.Item onClick={() => setEndThisClick(time.end_time)}>
                {time.end_time}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="meetingTopicForm">
        <input
          className={isPc ? 'topicInput' : 'm_topicInput'}
          onChange={inputTopic}
          placeholder="회의 주제를 입력해주세요."
        ></input>
      </div>
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
        <div className={isMobile ? 'divButton' : ''}>
          <button
            className={isPc ? 'roomReservationBtn' : 'mRoomReservationBtn'}
            onClick={reservationClickHandler}
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParticipant;
