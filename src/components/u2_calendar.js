import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import * as FaIcon from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import RoomTimeTable from './u2_roomTimeTable';
import { useMediaQuery } from 'react-responsive';
import * as moment from 'moment';
import AddParticipant from './u2_addParticipant';
import '../assets/styles/u2_calendar.css';
//회의실 예약 페이지-> 이용시간 선택
const Calendar = props => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const [startDate, setStartDate] = useState(new Date());
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
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            locale={ko}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            maxDate={addDays(new Date(), 6)}
            placeholderText="예약 날짜 선택"
            closeOnScroll={true}
            customInput={<MyCustom />}
          />
        </div>
      ) : (
        <>
          <div className="m_customPicker">
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              locale={ko}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              maxDate={addDays(new Date(), 6)}
              placeholderText="예약 날짜 선택"
              closeOnScroll={true}
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
        {isPc ? (
          <RoomTimeTable
            MAXUSER={roomMAXUSER}
            selectedDate={moment(startDate).format('YYYY-MM-DD HH:mm')}
            roomId={roomID}
          />
        ) : (
          <AddParticipant
            MAXUSER={roomMAXUSER}
            selectedDate={moment(startDate).format('YYYY-MM-DD HH:mm')}
            ROOMID={roomID}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
