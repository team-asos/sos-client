import React, { useState, useEffect, useReducer } from 'react';
import { Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import * as moment from 'moment';
import AddParticipant from './u2_addParticipant';
import * as GrIcon from 'react-icons/gr';

import '../assets/styles/u2_roomTimeTable.css';
const RoomTimeTable = ({ MAXUSER, selectedDate, roomId }) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const [timeTable, setTimeTable] = useState([]);
  const [isReserved, setIsReserved] = useState([]); //예약 되어있는지 확인
  const [start, setStart] = useState(''); //진짜 예약할 시간 보내줘야함
  const [end, setEnd] = useState(''); //진짜 예약할 시간
  const [deleteClick, setDeleteClick] = useState(0); //선택취소가 눌렸는지 안눌렸는지
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

  const [clickes, setClickes] = useState([]);
  const fetchRoomTable = async () => {
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
        setTimeTable(
          json.map(time => {
            if (time.id) {
              return {
                ...time,
                start_time: moment(time.start_time).format('HH:mm'),
                end_time: moment(time.end_time).format('HH:mm'),
                startTime: moment(time.startTime).format('HH:mm'),
                endTime: moment(time.endTime).format('HH:mm'),
              };
            } else {
              return {
                ...time,
                start_time: moment(time.start_time).format('HH:mm'),
                end_time: moment(time.end_time).format('HH:mm'),
              };
            }
          }),
        );
      });
  };

  useEffect(() => {
    if (secondClick.isClicked) {
      setEnd(secondClick.End);
    } else if (firstClick.isClicked) {
      setStart(firstClick.Start);
      setEnd(firstClick.End);
    }
  }, [firstClick, secondClick]);

  const reset = () => {
    setFirstClick({ Start: '', End: '', isClicked: 0, idx: null }); //초기화
    setSecondClick({ Start: '', End: '', isClicked: 0, idx: null }); //초기화
    setStart('시작');
    setEnd('종료');
    setClickes([]);
  };

  /*테이블 시간 클릭 했을 때 */
  const clickHandler = (startTime, endTime, i, e) => {
    /*전 시간을 예약하려고 할 때 */
    if (selectedDate.slice(0, 10) === date && startTime < time) {
      return alert('예약 불가능한 시간입니다.');
    }
    if (!firstClick.isClicked) {
      //첫번째가 선택 안됐을 때
      setFirstClick({
        Start: startTime,
        End: endTime,
        isClicked: 1,
        idx: i,
      });
      setClickes([i]);

      console.log(firstClick.Start);
    } else if (firstClick.isClicked) {
      console.log(firstClick);
      //첫번째가 선택 됐을 때
      if (startTime === firstClick.Start && endTime === firstClick.End) {
        //똑같은거 다시 눌렀을 때
        reset();
      } else if (!secondClick.isClicked) {
        console.log(secondClick);
        //첫번째랑 다를 때 두번째로 설정
        setSecondClick({
          Start: startTime,
          End: endTime,
          isClicked: 1,
          idx: i,
        });
        setClickes(
          Array.from(
            { length: i - firstClick.idx + 1 },
            (_, i) => i + firstClick.idx,
          ),
        );
        console.log(secondClick);
      } else if (secondClick.isClicked === 1) {
        reset();
      }
    }
  };
  //선택 삭제 버튼 눌렀을 때
  const deleteSelection = () => {
    // if (firstClick.idx===null && secondClick.idx===null)
    //   alert('시간을 선택해주세요.');
    setDeleteClick(!deleteClick);
    reset();
  };

  useEffect(() => {
    if (roomId !== null && selectedDate !== null) {
      fetchRoomTable();
      reset();
    }
  }, [selectedDate]);

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
        <Table className={isPc ? '' : 'm_roomTimeTable'}>
          <thead>
            <tr>
              <th style={isPc ? { width: '13%' } : { width: '20%' }}>
                시간
                <GrIcon.GrPowerReset
                  onClick={() => deleteSelection()}
                  className="resetSelectTime"
                />
              </th>
              <th style={{ width: '40%' }}>회의 주제</th>
              <th style={{ width: '10%' }}>대표자</th>
              {isPc ? <th style={{ width: '40%' }}>참석자</th> : null}
            </tr>
          </thead>
          <tbody>
            {timeTable &&
              selectedDate &&
              // timeTable[0] &&
              // timeTable[0].start_time.length < 10 &&
              timeTable.map(
                (item, idx) => (
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
                        style={
                          clickes.includes(idx)
                            ? { backgroundColor: 'crimson' }
                            : clickes.includes(idx) && deleteClick
                            ? { backgroundColor: '#fff' }
                            : { backgroundColor: '#fff' }
                          // isClicked[idx]
                          //   ? { backgroundColor: 'crimson' }
                          //   : isClicked[idx] && deleteClick
                          //   ? { backgroundColor: 'none' }
                          //   : isClicked[idx] && thirdClick.isClicked
                          //   ? { backgroundColor: 'none' }
                          //   : null
                        }
                      >
                        {item.start_time}-{item.end_time}
                      </td>
                      {/*회의주제 추가해야함 */}
                      {item.id ? (
                        <td className="isReserved">{item.topic}</td>
                      ) : (
                        /*예약되어있지는 않지만 지금 시간보다 전이면 */
                        <td></td>
                      )}
                      {item.id ? (
                        <td className="isReserved">{item.user.name}</td>
                      ) : (
                        /*예약되어있지는 않지만 지금 시간보다 전이면 */
                        <td></td>
                      )}
                      {isPc && item.id ? (
                        <td className="isReserved">
                          {item.participants.map((users, idx) =>
                            idx === item.participants.length - 1
                              ? users.user.name
                              : users.user.name + ', ',
                          )}
                        </td>
                      ) : isPc ? (
                        /*예약되어있지는 않지만 지금 시간보다 전이면 */
                        <td></td>
                      ) : !isPc ? null : null}
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
