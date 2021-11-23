import React, { useState, useEffect } from 'react';
import { getYear } from 'date-fns';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import { useCookies } from 'react-cookie';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Calendar from './u2_calendar';
import { Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

import '../assets/styles/u2_roomTimeTable.css';
const RoomTimeTable = ({ selectedDate, roomId }) => {
  const [timeTable, setTimeTable] = useState([]);
  const [name, setName] = useState('Mark');
  const [isClicked, setIsClicked] = useState(0);
  const [firstClick, setFirstClick] = useState(0);
  const [secondClick, setSecondClick] = useState(0);
  //const [selectedTimeColor, setSelectedTimeColor] = useState('white');

  const clickHandler = e => {
    if (!isClicked) {
      setFirstClick(e);
    } else if (isClicked) {
      setSecondClick(e);
    }
    setIsClicked(!isClicked);
    console.log(firstClick, secondClick);
  };
  useEffect(() => {
    const fetchRoomTable = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/room/${roomId}/table`,
        {
          headers: {
            //Authorization: `Bearer ${cookie.access_token}`,
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
    fetchRoomTable();
  }, []);
  return (
    <div
      style={{
        marginTop: '1%',
        width: '60%',
        height: '70vh',
        overflow: 'auto',
      }}
    >
      <Table>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>시간</th>
            <th>참석자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td key={1} className={isClicked ? 'clickTime' : 'time'}>
              8:00
            </td>
            <td onClick={() => clickHandler(1)} style={{ cursor: 'pointer' }}>
              Mark
            </td>
          </tr>
          <tr>
            <td
              key={2}
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(2)}
            >
              8:30
            </td>
            <td>Jacob</td>
          </tr>
          <tr>
            <td
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(3)}
            >
              9:00
            </td>
            <td>{name}</td>
          </tr>
          <tr>
            <td
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(4)}
            >
              9:30
            </td>
            <td></td>
          </tr>
          <tr>
            <td
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(5)}
            >
              10:00
            </td>
            <td></td>
          </tr>
          <tr>
            <td
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(6)}
            >
              10:30
            </td>
            <td></td>
          </tr>
          <tr>
            <td
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(7)}
            >
              11:00
            </td>
            <td></td>
          </tr>
          <tr>
            <td
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(8)}
            >
              11:30
            </td>
            <td>Larry</td>
          </tr>
          <tr>
            <td
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(9)}
            >
              12:00
            </td>
            <td>Larry</td>
          </tr>
          <tr>
            <td
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(10)}
            >
              12:30
            </td>
            <td>Larry</td>
          </tr>
          <tr>
            <td
              className={isClicked ? 'clickTime' : 'time'}
              onClick={() => clickHandler(11)}
            >
              13:00
            </td>
            <td>Larry</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default RoomTimeTable;
