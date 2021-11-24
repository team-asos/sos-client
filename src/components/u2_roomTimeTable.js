import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import { formatISO } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import * as moment from 'moment';
import AddParticipant from './u2_addParticipant';

import '../assets/styles/u2_roomTimeTable.css';
const RoomTimeTable = ({ MAXUSER, selectedDate, roomId }) => {
  const [timeTable, setTimeTable] = useState([]);
  const [isReserved, setIsReserved] = useState([]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const clickHandler = (startTime, endTime) => {
    console.log(startTime, endTime);
    setStart(startTime);
    setEnd(endTime);
  };
  const fetchRoomTable = async () => {
    const result = await fetch(
      `${
        process.env.REACT_APP_SERVER_BASE_URL
      }/reservations/room/${roomId}/table?date=${moment(selectedDate).format(
        'YYYY-MM-DD',
      )}`,
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
  useEffect(() => {
    if (roomId !== null && selectedDate !== null) {
      fetchRoomTable();
    }
  }, [roomId, selectedDate]);
  useEffect(() => {
    if (timeTable !== null) convertToKST();
  }, [timeTable]);
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
    }
  };
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
              <th style={{ width: '20%' }}>시간</th>
              <th style={{ width: '10%' }}>대표자</th>
              <th>참석자</th>
            </tr>
          </thead>
          <tbody>
            {timeTable &&
              timeTable.map((item, idx) => (
                <tr key={idx}>
                  <td
                    className={isReserved[idx] ? 'isReserved' : 'isNotReserved'}
                    onClick={
                      !isReserved[idx]
                        ? () => clickHandler(item.start_time, item.end_time)
                        : null
                    }
                  >
                    {item.start_time}-{item.end_time}
                  </td>
                  {item.id ? (
                    <td
                      className={
                        isReserved[idx] ? 'isReserved' : 'isNotReserved'
                      }
                    >
                      {item.user.name}
                    </td>
                  ) : (
                    <td></td>
                  )}
                  {item.id ? (
                    <td
                      className={
                        isReserved[idx] ? 'isReserved' : 'isNotReserved'
                      }
                    >
                      {item.participants.map(users => users.user.name)}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <AddParticipant
        START={start}
        END={end}
        MAXUSER={MAXUSER}
        ROOMID={roomId}
      />
    </>
  );
};

export default RoomTimeTable;
