import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Link } from 'react-router-dom';
import { getMonth, getDate, getYear } from 'date-fns';
import { useMediaQuery } from 'react-responsive';

import '../assets/styles/u1_roomInfoTable.css';

//전체 회의실 리스트 조회
const RoomInfoTable = () => {
  const [cookie] = useCookies(['access_token']);
  const [idx, setIdx] = useState();
  const [floorName, setFloorName] = useState([]);
  const [rooms, setRooms] = useState([]);
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });

  const isMobile = useMediaQuery({ query: '(max-width:767px)' });

  const handleClick = e => {
    setIdx(e);
    const idx = e;
    window.location.href = `/room-reservation/${idx}`;
  };

  useEffect(() => {
    const res = async () => {
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/rooms`, {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          setRooms(json);
        });
    };
    res();
  }, []);

  /*회의실 숫자로 정렬 */
  const sortedRooms = rooms.sort((a, b) => {
    if (parseInt(a.floor.name.split('층')) < parseInt(b.floor.name.split('층')))
      return -1;
  });
  return (
    <div>
      <MDBTable hover className={isPc ? 'infoTable' : 'mobileInfoTable'}>
        <MDBTableHead className="rHeader">
          <tr>
            <th>층</th>
            <th>회의실 명</th>
            <th>예약 가능 일</th>
            <th>사용 가능 인원</th>
            <th></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {rooms.map((item, idx) => (
            <tr key={idx}>
              <td>{item.floor.name}</td>
              <td>{item.name}</td>
              <td>
                {getYear(new Date()) +
                  '-' +
                  (getMonth(new Date()) + 1) +
                  '-' +
                  getDate(new Date()) +
                  ' ~ ' +
                  getYear(new Date()) +
                  '-' +
                  (getMonth(new Date()) + 1) +
                  '-' +
                  (getDate(new Date()) + 6)}
              </td>
              <td>{item.maxUser}명</td>
              <td>
                <Link
                  to={{
                    pathname: '/room-reservation',
                  }}
                >
                  <button
                    className={
                      isPc ? 'roomReservationButton' : 'm_roomReservationBtn'
                    }
                    onClick={() => handleClick(item.id)}
                  >
                    {isPc ? '예약하기' : '예약'}
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default RoomInfoTable;
