import React, { useState, useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import * as moment from 'moment';
import AddParticipant from './u2_addParticipant';

import '../assets/styles/u2_roomTimeTable.css';
const RoomTimeTable = ({ MAXUSER, selectedDate, roomId }) => {
  const [timeTable, setTimeTable] = useState([]);
  const [isReserved, setIsReserved] = useState([]); //예약 되어있는지 확인
  //const isClicked = Array.from({ length: 20 }, () => 0); 이렇게 하고 싶지만 1로 바꿔주는게 밑에 있어서 색상 적용이 안됨
  const [start, setStart] = useState(''); //진짜 예약할 시간 보내줘야함
  const [end, setEnd] = useState(''); //진짜 예약할 시간
  const [deleteClick, setDeleteClick] = useState(0); //선택취소가 눌렸는지 안눌렸는지
  const [isClicked, setIsClicked] = useState([]); //색상 지정하기 위해
  const [isPast, setIsPast] = useState([]);
  const [time, setTime] = useState(
    moment(new Date()).format('HH:mm').toString(),
  ); //지금 시간
  const [date, setDate] = useState(
    moment(new Date()).format('YYYY-MM-DD').toString(),
  ); //지금 날짜
  const [firstClick, setFirstClick] = useState({
    Start: '',
    End: '',
    isClicked: 0,
    idx: null,
  });
  const [secondClick, setSecondClick] = useState({
    Start: '',
    End: '',
    isClicked: 0,
    idx: null,
  });
  const fetchRoomTable = async () => {
    for (let i = 0; i < 20; i++) {
      isClicked[i] = 0;
    }
    const result = await fetch(
      `${
        process.env.REACT_APP_SERVER_BASE_URL
      }/reservations/room/${roomId}/table?date=${selectedDate.slice(0, 10)}`,
      {
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        setTimeTable(json);
      });
  };
  const tableColorStyle = isClicked => {
    if (isClicked) return { backgroundColor: 'crimson' };
    else if (!isClicked) return { backgroundColor: 'none' };
  };
  /*테이블 시간 클릭 했을 때 */
  const clickHandler = (startTime, endTime, i, e) => {
    if (!firstClick.isClicked) {
      //첫번째가 선택 안됐을 때
      setFirstClick({
        Start: startTime,
        End: endTime,
        isClicked: 1,
        idx: i,
      });
      //firstClick.startTime으로 바꾸고 싶은데 비동기 처리를 못 하겠음
      //일단 임시방편임 실시간으로 input값에 들어가게 하고 싶어서
      setStart(startTime);
      setEnd(endTime);
    } else if (firstClick.isClicked) {
      //여기는 firstClick에 값 들어감
      //첫번째가 선택 됐을 때
      if (startTime === firstClick.Start && endTime === firstClick.End) {
        //똑같은거 다시 눌렀을 때
        setFirstClick({ Start: '', End: '', isClicked: 0, idx: null }); //초기화
        setStart('');
        setEnd('');
      } else if (!secondClick.isClicked) {
        //첫번째랑 다를 때 두번째로 설정
        setSecondClick({
          Start: startTime,
          End: endTime,
          isClicked: 1,
          idx: i,
        });
      } else if (secondClick.isClicked) {
        //누르자 마자 바뀌어야하기 때문에 여기에 있는게 맞음
        for (let i = firstClick.idx; i < secondClick.idx; i++) {
          isClicked[i] = 0;
        }
        setFirstClick({ Start: '', End: '', isClicked: 0, idx: null }); //초기화
        setSecondClick({ Start: '', End: '', isClicked: 0, idx: null }); //초기화
        //setStart('');//초기화 하면 input값이 사라짐 ㅠ
        setEnd('');
      }
    }
    //여기부터는 first,second뜸
    //setSecondClick 설정되고 바로 설정해주고 싶음
    if (secondClick.idx) {
      if (secondClick.idx > firstClick.idx) {
        setEnd(secondClick.End); //이것도 위에서 해주면 좋음
        for (let i = 0; i <= timeTable.length; i++) {
          //시작~끝 색상 변경하기 위해.. 원래는 위에서 secondClick되자마자 해줘야함
          if (i >= firstClick.idx && i <= secondClick.idx) {
            isClicked[i] = 1;
          } else {
            isClicked[i] = 0;
          }
        }
      } else {
        alert('시작 시간을 먼저 선택해주세요.');
        setStart('');
        setEnd('');
      }
    }
  };
  //선택 삭제 버튼 눌렀을 때
  const deleteSelection = () => {
    setDeleteClick(!deleteClick);
    for (let i = 0; i < 20; i++) {
      isClicked[i] = 0;
    }
    setFirstClick({ Start: '', End: '', isClicked: 0, idx: null }); //초기화
    setSecondClick({ Start: '', End: '', isClicked: 0, idx: null }); //초기화
    setStart('');
    setEnd('');
  };
  //예약,클릭 되어있는지 색칠한거 초기화
  const resetIsReserved = () => {
    console.log('여기들어옴');
    for (let i = 0; i < 20; i++) {
      isReserved[i] = 0; //예약표시한거 초기화
      isClicked[i] = 0; //클릭 표시한 거 초기화
    }
  };
  useEffect(() => {
    if (roomId !== null && selectedDate !== null) {
      fetchRoomTable();
      resetIsReserved(); //예약, 클릭 상태초기화
    }
  }, [selectedDate]);

  console.log(timeTable);
  useEffect(() => {
    if (timeTable !== null) convertToKST();
  }, [timeTable]); //selectedDate넣으면 왜 안뜨는지
  const convertToKST = () => {
    for (let i = 0; i < timeTable.length; i++) {
      timeTable[i].start_time = moment(timeTable[i].start_time).format('HH:mm');
      timeTable[i].end_time = moment(timeTable[i].end_time).format('HH:mm');
      if (timeTable[i].id) {
        for (let j = 0; j < timeTable.length; j++) {
          if (i == j) isReserved[j] = 1;
        }
        timeTable[i].startTime = moment(timeTable[i].startTime).format('HH:mm');
        timeTable[i].endTime = moment(timeTable[i].endTime).format('HH:mm');
      }
      // if (
      //   //만약에 지금 시간보다 전이면
      //   selectedDate.slice(0, 10) === date &&
      //   timeTable[i].start_time < time
      // ) {
      //   isPast[i] = 1;
      // } else isPast[i] = 0;
    }
  };
  console.log(isReserved);
  console.log(isClicked);
  return (
    <>
      <div
        style={{
          marginTop: '1%',
          width: '100%',
          height: '70vh',
          overflow: 'auto',
        }}
      >
        <Table>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>
                시간<button onClick={() => deleteSelection()}>선택 취소</button>
              </th>
              <th style={{ width: '10%' }}>대표자</th>
              <th>참석자</th>
            </tr>
          </thead>
          <tbody>
            {timeTable &&
              selectedDate &&
              timeTable[0] &&
              timeTable[0].start_time.length < 10 &&
              timeTable.map(
                (item, idx) => (
                  //item.start_time.length < 10 ? (
                  <>
                    <tr key={idx}>
                      {/*시간 */}
                      <td
                        className={
                          isReserved[idx] ? 'isReserved' : 'isNotReserved'
                        }
                        onClick={
                          !isReserved[idx]
                            ? e =>
                                clickHandler(
                                  item.start_time,
                                  item.end_time,
                                  idx,
                                  e,
                                )
                            : null
                        }
                        style={tableColorStyle(isClicked[idx])}
                      >
                        {item.start_time}-{item.end_time}
                      </td>
                      {item.id ? (
                        <td className="isReserved">{item.user.name}</td>
                      ) : (
                        /*예약되어있지는 않지만 지금 시간보다 전이면 */
                        <td></td>
                      )}
                      {item.id ? (
                        <td className="isReserved">
                          {item.participants.map((users, idx) =>
                            idx === item.participants.length - 1
                              ? users.user.name
                              : users.user.name + ', ',
                          )}
                        </td>
                      ) : (
                        /*예약되어있지는 않지만 지금 시간보다 전이면 */
                        <td></td>
                      )}
                    </tr>
                  </>
                ),
                // ) : null,
                /*여기 가 map끝 */
              )}
          </tbody>
        </Table>
      </div>
      <AddParticipant
        START={start}
        END={end}
        MAXUSER={MAXUSER}
        ROOMID={roomId}
        selectedDate={selectedDate}
        timeTable={timeTable}
        deleteClick={deleteClick}
      />
    </>
  );
};

export default RoomTimeTable;
