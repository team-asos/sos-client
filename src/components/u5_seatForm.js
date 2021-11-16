import React, { useState } from 'react';
import Toilet from '../assets/images/toilet.png';
import AirConditioner from '../assets/images/air_conditioner.png';
import '../assets/styles/u5_seatForm.css';
const FacilityForm = () => {
  const [show, setShow] = useState(false); //facility아이콘 누르면 보여주기
  const seatData = {
    listData: [
      {
        id: 1,
        name: '1번',
        x: 1,
        y: 1,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 2,
        name: '2번',
        x: 3,
        y: 2,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 4,
        name: '3번',
        x: 6,
        y: 4,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 5,
        name: '4번',
        x: 4,
        y: 4,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 6,
        name: '5번',
        x: 5,
        y: 4,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 7,
        name: '6번',
        x: 7,
        y: 4,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 8,
        name: '6번',
        x: 8,
        y: 5,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 9,
        name: '6번',
        x: 5,
        y: 7,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 10,
        name: '10번',
        x: 10,
        y: 7,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 11,
        name: '11번',
        x: 10,
        y: 10,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 12,
        name: '12번',
        x: 9,
        y: 10,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 13,
        name: '13번',
        x: 12,
        y: 10,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 14,
        name: '14번',
        x: 15,
        y: 10,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
      {
        id: 15,
        name: '14번',
        x: 20,
        y: 9,
        width: 1,
        height: 1,
        floor: {
          id: 1,
          name: '1층',
          width: 100,
          height: 100,
        },
      },
    ],
  };
  const handleClick = e => {
    console.log(e.nativeEvent.offsetX); //컴포넌트 내에서의 위치
  };

  return <div className="seatFormStyle"></div>;
};
export default FacilityForm;
