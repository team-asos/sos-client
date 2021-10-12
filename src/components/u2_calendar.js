import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { Dropdown, DropdownButton } from 'react-bootstrap';
//회의실 예약 페이지-> 이용시간
const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date()); //DatePicker

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        minDate={new Date()}
      />
      <DropdownButton id="time" title="시" variant="secondary">
        <Dropdown.Item eventKey="8시">8tl</Dropdown.Item>
        <Dropdown.Item href="#/action-2">9시</Dropdown.Item>
        <Dropdown.Item href="#/action-3">10시</Dropdown.Item>
        <Dropdown.Item href="#/action-1">11시</Dropdown.Item>
        <Dropdown.Item href="#/action-2">12시</Dropdown.Item>
        <Dropdown.Item href="#/action-3">13시</Dropdown.Item>
        <Dropdown.Item href="#/action-1">14시</Dropdown.Item>
        <Dropdown.Item href="#/action-2">15시</Dropdown.Item>
        <Dropdown.Item href="#/action-3">16시</Dropdown.Item>
        <Dropdown.Item href="#/action-3">17시</Dropdown.Item>
        <Dropdown.Item href="#/action-3">18시</Dropdown.Item>
        <Dropdown.Item href="#/action-3">19시</Dropdown.Item>
        <Dropdown.Item href="#/action-3">20시</Dropdown.Item>
        <Dropdown.Item href="#/action-3">21시</Dropdown.Item>
      </DropdownButton>
      부터
      <DropdownButton id="time2" title="시간" variant="secondary">
        <Dropdown.Item href="#/action-1">1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">3</Dropdown.Item>
        <Dropdown.Item href="#/action-3">4</Dropdown.Item>
        <Dropdown.Item href="#/action-3">5</Dropdown.Item>
        <Dropdown.Item href="#/action-3">6</Dropdown.Item>
        <Dropdown.Item href="#/action-3">7</Dropdown.Item>
        <Dropdown.Item href="#/action-3">8</Dropdown.Item>
        <Dropdown.Item href="#/action-3">9</Dropdown.Item>
        <Dropdown.Item href="#/action-3">10</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default Calendar;
