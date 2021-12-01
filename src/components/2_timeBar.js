import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

const DateTimeBox = () => {
  moment.updateLocale('ko', {
    weekdays: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
  });

  let timer = null;
  const [time, setTime] = useState(moment());

  useEffect(() => {
    timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

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
        {time.format('YYYY. MM. D.')}
      </p>
      <p style={{ fontWeight: 'bold', marginBottom: '25%' }}>
        {time.format('dddd')}
      </p>
      <p style={{ fontWeight: 'bold' }}>{time.format('HH:mm:ss')}</p>
    </div>
  );
};

export default DateTimeBox;
