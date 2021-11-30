import React, { useState } from 'react';

const DateTimeBox = () => {
  const [date, setDate] = useState(new Date());

  const callTime = () => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
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
      }}
    >
      <p style={{ fontWeight: 'bold', color: 'gray' }}>
        {date.toLocaleDateString()}
      </p>
      <p style={{ fontWeight: 'bold', color: '#c4c4c4' }}>{getToday()}</p>
      <p style={{ fontWeight: 'bold', color: 'white' }}>
        {date.toLocaleTimeString('en-GB')}
      </p>
      {callTime()}
    </div>
  );
};

export default DateTimeBox;
