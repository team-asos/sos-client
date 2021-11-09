import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import {
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getYear,
  formatISO,
} from 'date-fns';

import { addDays } from 'date-fns';
import AddParticipant from './u2_addParticipant';
import '../assets/styles/u2_calendar.css';

//회의실 예약 페이지-> 이용시간 선택
const Calendar = props => {
  const [startDate, setStartDate] = useState(new Date()); //DatePicker
  const [endDate, setEndDate] = useState(new Date());
  const roomMAXUSER = props.roomMAXUSER;

  const MyCustom = forwardRef(({ value, onClick }, ref) => (
    <button className="customPicker" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <>
      <div className="pickersTextStyle">이용 시간</div>
      <div className="pickers">
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          locale={ko}
          dateFormat="yyyy-MM-dd hh:mm"
          minDate={new Date()} //오늘 이전 날짜 선택 안되게
          maxDate={addDays(new Date(), 6)} //일주일 뒤는 예약 못함
          placeholderText="예약 날짜 선택"
          showTimeInput
          closeOnScroll={true} //스크롤 했을 때 닫힘
          customInput={<MyCustom />}
        />
        <div className="waveStyle">~</div>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          locale={ko}
          dateFormat="yyyy-MM-dd hh:mm"
          minDate={startDate} //오늘 이전 날짜 선택 안되게
          maxDate={startDate} //앞에 선택된 날짜 고정
          placeholderText="예약 날짜 선택"
          showTimeInput
          closeOnScroll={true} //스크롤 했을 때 닫힘
          customInput={<MyCustom />}
        />
      </div>
      <AddParticipant
        // START={
        //   getYear(startDate) +
        //   '-' +
        //   (getMonth(startDate) + 1) +
        //   '-' +
        //   getDate(startDate) +
        //   ' ' +
        //   getHours(startDate) +
        //   ':' +
        //   getMinutes(startDate)
        // }

        START={formatISO(startDate)}
        END={formatISO(endDate)}
        MAXUSER={roomMAXUSER}
      />
    </>
  );
};

export default Calendar;
