import React, { useState, useEffect } from 'react';
import { getYear } from 'date-fns';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import { useCookies } from 'react-cookie';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Calendar from './u2_calendar';
import { useMediaQuery } from 'react-responsive';

import '../assets/styles/u2_roomTimeTable.css';
//회의실 예약 페이지-> 선택된 회의실 설명 테이블(room-check에서 정보 받아오기)
const RoomTimeTable = selectedDate => {
  console.log(selectedDate);
  const clickHandler = () => {
    console.log('클릭');
  };
  return (
    <div
      style={{
        marginTop: '2%',
        width: '60%',
        height: '70vh',
        backgroundColor: 'yellow',
      }}
    >
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th style={{ width: '20%' }}>시간</th>
            <th>참석자</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>1</td>
            <td onClick={() => clickHandler()} style={{ cursor: 'pointer' }}>
              Mark
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default RoomTimeTable;
