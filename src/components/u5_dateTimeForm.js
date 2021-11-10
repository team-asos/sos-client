import React, { useState, forwardRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { addDays, getDate, getHours, getMinutes, getYear } from 'date-fns';
import '../assets/styles/u5_dateTimeForm.css';
import '../assets/styles/u2_calendar.css';
import getMonth from 'date-fns/getMonth';
import * as FaIcon from 'react-icons/fa';

//좌석 예약 페이지->이용 시간 선택
const DateTimeForm = () => {
  const [startDate, setStartDate] = useState(new Date()); //DatePicker
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const MyCustom = forwardRef(({ value, onClick }, ref) => (
    <button className="customPicker2" onClick={onClick} ref={ref}>
      {value}
      <FaIcon.FaRegCalendarAlt size={30} style={{ marginLeft: '0.5vw' }} />
    </button>
  ));
  return (
    <div className="dateTimeAndBtnForm">
      <div className="dateTimeForm">
        <div className="seatNameTextStyle">[ 좌석 18 ]</div>
        <div className="reservationDatePicker">
          <div className="reservationDatePicker_start">
            <p className="startTimeTextStyle">사용 일시(시작)</p>
            <DatePicker
              selected={startDate}
              onChange={date => {
                setStartDate(date);
              }}
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

          <div className="reservationDatePicker_end">
            <p className="startTimeTextStyle">사용 일시(종료)</p>
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
      </div>
      <div className="seatReservationButtonForm">
        <button className="seatReservationBtn" onClick={handleShow}>
          예약하기
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>좌석 18</Modal.Title>
          </Modal.Header>
          <Modal.Body>예약 하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="success" onClick={handleClose}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default DateTimeForm;
