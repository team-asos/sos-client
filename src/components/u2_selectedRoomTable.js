import { addDays } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import * as moment from 'moment';

import Calendar from './u2_calendar';
import { useMediaQuery } from 'react-responsive';

import '../assets/styles/u2_selectedRoomTable.css';
const SelectedRoomTable = props => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const [cookie] = useCookies(['access_token']);
  const roomID = props.roomID;
  const [data, setData] = useState([]);
  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/rooms/${roomID}`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
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

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MDBTable
          hover
          className={isPc ? 'u2_selectedTable' : 'm_u2_selectedTable'}
        >
          <MDBTableHead className="rHeader">
            <tr>
              <th>회의실명</th>
              <th>예약 가능 일</th>
              <th>사용 가능 인원</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>{data.name}</td>
              <td>
                {moment(new Date()).format('YYYY-MM-DD')}~
                {moment(addDays(new Date(), 6)).format('YYYY-MM-DD')}
              </td>
              <td>{data.maxUser}명</td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </div>

      <Calendar roomMAXUSER={data.maxUser} roomID={roomID} />
    </>
  );
};

export default SelectedRoomTable;
