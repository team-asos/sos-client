import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import * as FaIcon from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import AddParticipant from './u2_addParticipant';
import RoomTimeTable from './u2_roomTimeTable';
import { useMediaQuery } from 'react-responsive';
import * as moment from 'moment';
import '../assets/styles/u2_calendar.css';
//회의실 예약 페이지-> 이용시간 선택
const Calendar = props => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const [startDate, setStartDate] = useState(new Date()); //DatePicker
  const roomMAXUSER = props.roomMAXUSER;
  const roomID = props.roomID;
  const MyCustom = forwardRef(({ value, onClick }, ref) => (
    <button
      className={isPc ? 'customPicker' : 'm_customPicker'}
      onClick={onClick}
      ref={ref}
    >
      {value}
      <FaIcon.FaRegCalendarAlt
        size={isPc ? 30 : 15}
        style={{ marginLeft: '0.5vw' }}
      />
    </button>
  ));
  return (
    <div style={{ width: '100%' }}>
      {isPc ? (
        <div className="roomDatePicker">
          <div className="pickersTextStyle">날짜 선택</div>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            locale={ko}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()} //오늘 이전 날짜 선택 안되게
            maxDate={addDays(new Date(), 6)} //일주일 뒤는 예약 못함
            placeholderText="예약 날짜 선택"
            closeOnScroll={true} //스크롤 했을 때 닫힘
            customInput={<MyCustom />}
          />
        </div>
      ) : (
        <>
          <div className="mPicker">
<<<<<<< HEAD
            <p className="pickerText">시작</p>
=======
            {/* <p className="pickerText"></p> */}
>>>>>>> develop
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              locale={ko}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()} //오늘 이전 날짜 선택 안되게
              maxDate={addDays(new Date(), 6)} //일주일 뒤는 예약 못함
              placeholderText="예약 날짜 선택"
<<<<<<< HEAD
              showTimeInput
=======
>>>>>>> develop
              closeOnScroll={true} //스크롤 했을 때 닫힘
              customInput={<MyCustom />}
            />
          </div>
        </>
      )}
      <div
        className={
          isPc ? 'timeTableAndAddParticipant' : 'm_timeTableAndAddParticipant'
        }
      >
        <RoomTimeTable
          MAXUSER={roomMAXUSER}
          selectedDate={moment(startDate).format('YYYY-MM-DD HH:mm')}
          roomId={roomID}
        />
      </div>
    </div>
  );
};

export default Calendar;
