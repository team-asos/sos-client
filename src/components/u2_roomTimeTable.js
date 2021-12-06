import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import * as moment from 'moment';
import AddParticipant from './u2_addParticipant';
import * as GrIcon from 'react-icons/gr';

import '../assets/styles/u2_roomTimeTable.css';
const RoomTimeTable = ({
  MAXUSER,
  selectedDate,
  roomId,
  selectedMembers,
  myId,
  membersId,
  topic,
}) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const [timeTable, setTimeTable] = useState([]);
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
  /*예약하기 */
  const reservationClickHandler = async () => {
    if (start.length <= 2 || end.length <= 2) {
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
          startTime: selectedDate.slice(0, 11) + start,
          endTime: selectedDate.slice(0, 11) + end,
          userId: Number(myId),
          roomId: Number(roomId),
          participantIds: membersId,
          topic,
        }),
      },
    );
    if (response.status === 201) {
      alert('예약이 완료되었습니다.');
      window.location.href = `/room-reservation/${roomId}`;
    } else {
      alert(response.status);
    }
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
    setFirstClick({ Start: '', End: '', isClicked: 0, idx: null });
    setSecondClick({ Start: '', End: '', isClicked: 0, idx: null });
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
    } else if (firstClick.isClicked) {
      //첫번째가 선택 됐을 때
      if (startTime === firstClick.Start && endTime === firstClick.End) {
        //똑같은거 다시 눌렀을 때
        reset();
      } else if (!secondClick.isClicked) {
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
      } else if (secondClick.isClicked === 1) {
        reset();
      }
    }
  };
  //선택 삭제 버튼 눌렀을 때
  const deleteSelection = () => {
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
        style={
          isPc
            ? {
                marginTop: '1%',
                width: '100%',
                height: '70vh',
                overflow: 'auto',
                marginBottom: '1%',
              }
            : {
                height: '40vh',
                marginTop: '1%',
                width: '100%',
                overflow: 'auto',
                marginBottom: '1%',
              }
        }
      >
        <Table className={isPc ? null : 'm_roomTimeTable'}>
          <thead>
            <tr>
              <th style={isPc ? { width: '13%' } : { width: '16%' }}>
                시간
                <GrIcon.GrPowerReset
                  onClick={() => deleteSelection()}
                  className="resetSelectTime"
                />
              </th>
              <th style={isPc ? { width: '40%' } : { width: '29%' }}>
                회의 주제
              </th>
              <th style={{ width: '10%' }}>대표자</th>
              {isPc ? <th style={{ width: '40%' }}>참석자</th> : null}
            </tr>
          </thead>
          <tbody>
            {timeTable &&
              selectedDate &&
              timeTable.map((item, idx) => (
                <tr key={idx}>
                  <td
                    className={item.id ? 'isReserved' : 'isNotReserved'}
                    onClick={
                      !item.id
                        ? e =>
                            clickHandler(item.start_time, item.end_time, idx, e)
                        : null
                    }
                    style={
                      clickes.includes(idx)
                        ? {
                            backgroundColor: 'firebrick',
                            color: 'whitesmoke',
                          }
                        : clickes.includes(idx) && deleteClick
                        ? { backgroundColor: 'rgb(240, 240, 240)' }
                        : { backgroundColor: 'rgb(240, 240, 240)' }
                    }
                  >
                    {item.start_time}-{item.end_time}
                  </td>
                  {item.id ? (
                    <td className="isReserved">{item.topic}</td>
                  ) : (
                    <td></td>
                  )}
                  {item.id ? (
                    <td className="isReserved">{item.user.name}</td>
                  ) : (
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
                    <td></td>
                  ) : !isPc ? null : null}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {isPc ? (
        <AddParticipant
          START={start}
          END={end}
          MAXUSER={MAXUSER}
          ROOMID={roomId}
          selectedDate={selectedDate}
          timeTable={timeTable}
          deleteClick={deleteClick}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2vh',
          }}
        >
          <button
            className="mRoomReservationBtn"
            onClick={reservationClickHandler}
          >
            예약하기
          </button>
        </div>
      )}
    </>
  );
};

export default RoomTimeTable;
