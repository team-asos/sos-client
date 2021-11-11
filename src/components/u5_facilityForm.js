import React, { useState } from 'react';
import Toilet from '../assets/images/toilet.png';
import AirConditioner from '../assets/images/air_conditioner.png';

import '../assets/styles/u5_facilityForm.css';
//좌석 예약 페이지->시설물 위치에 맞게 배치...seatStatusForm에 띄워야함
const FacilityForm = () => {
  const [show, setShow] = useState(false); //facility아이콘 누르면 보여주기
  const facilityData = {
    listData: [
      //???어떻게...........할지..
      { id: 0, type: 'toilet', x: 650, y: 390 },
      { id: 1, type: 'airc', x: 250, y: 145 },
    ],
  };
  const handleClick = e => {
    console.log(e.nativeEvent.offsetX); //컴포넌트 내에서의 위치
  };

  return (
    <div className="facilityFormStyle" show={show}>
      {facilityData.listData.map(item =>
        item.type === 'toilet' ? (
          <img
            src={Toilet}
            alt="Logo Image"
            style={{
              position: 'relative',
              left: item.x,
              top: item.y,
            }}
          />
        ) : item.type === 'airc' ? (
          <img
            src={AirConditioner}
            alt="Logo Image"
            style={{
              position: 'relative',
              left: item.x,
              top: item.y,
            }}
            onClick={handleClick}
          />
        ) : (
          ''
        ),
      )}
    </div>
  );
};
export default FacilityForm;
