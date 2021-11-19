import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import * as FaIcon from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { formatISO } from 'date-fns';
import { addDays } from 'date-fns';
import AddParticipant from './u2_addParticipant';
import { useMediaQuery } from 'react-responsive';
import '../assets/styles/u2_calendar.css';

//회의실 예약 페이지-> 이용시간 선택
const Calendar = props => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const [startDate, setStartDate] = useState(new Date()); //DatePicker
  const [endDate, setEndDate] = useState(startDate);
  const roomMAXUSER = props.roomMAXUSER;
  const roomID = props.roomID;
  const MyCustom = forwardRef(({ value, onClick }, ref) => (
    <button className="customPicker" onClick={onClick} ref={ref}>
      {value}
      <FaIcon.FaRegCalendarAlt size={30} style={{ marginLeft: '0.5vw' }} />
    </button>
  ));
  return (
    <>
      <div className="pickersTextStyle">이용 시간</div>
      {isPc ? (
        <>
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
        </>
      ) : (
        <>
          <div className="mPickers">
            <div className="mPicker">
              <p className="pickerText">시작</p>
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
            </div>
            <div className="mPicker">
              <p className="pickerText">종료</p>

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
          </div>
        </>
      )}

      <AddParticipant
        START={formatISO(startDate)}
        END={formatISO(endDate)}
        MAXUSER={roomMAXUSER}
        ROOMID={roomID}
      />
    </>
  );
};

export default Calendar;
