import React, { useState } from 'react';

const DateTimeBox = () => {
  const [date, setDate] = useState(new Date());

  const callTime = () => {
    let time = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(time);
    };
  };

  //요일 불러우는 함수
  const getToday = () => {
    var today = date.getDay();
    var week = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    return week[today];
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '40%',
        fontSize: '1em',
        color: 'white',
      }}
    >
      <p style={{ fontWeight: 'bold', marginBottom: '25%' }}>
        {date.toLocaleDateString()}
      </p>
      <p style={{ fontWeight: 'bold', marginBottom: '25%' }}>{getToday()}</p>
      <p style={{ fontWeight: 'bold' }}>{date.toLocaleTimeString('en-GB')}</p>
      {callTime()}
    </div>
  );
};

export default DateTimeBox;
