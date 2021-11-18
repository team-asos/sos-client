import React, { useState, forwardRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { addDays, formatISO } from 'date-fns';
import '../assets/styles/u5_dateTimeForm.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/u2_calendar.css';
import * as FaIcon from 'react-icons/fa';

//좌석 예약 페이지->이용 시간 선택
const DateTimeForm = props => {
  const [startDate, setStartDate] = useState(new Date()); //DatePicker
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*예약하기 */
  const reservationClickHandler = async () => {
    handleClose();
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/seat`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          startTime: formatISO(startDate),
          status: 0, //물어보기
          seatId: 1,
          userId: Number(props.myId),
        }),
      },
    );
    if (response.status === 201) {
      alert('예약이 완료되었습니다.');
    } else {
      alert(response.status);
    }
  };

  const MyCustom = forwardRef(({ value, onClick }, ref) => (
    <button className="customPicker2" onClick={onClick} ref={ref}>
      {value}
      <FaIcon.FaRegCalendarAlt size={30} style={{ marginLeft: '0.5vw' }} />
    </button>
  ));
  return (
    <div className="dateTimeAndBtnForm">
      <div className="dateTimeForm">
        <div className="seatNameTextStyle">[좌석 18]</div>
        <div className="reservationDatePicker">
          <div className="reservationDatePicker_start">
            <p className="startTimeTextStyle">사용 일시</p>
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
            <Button variant="success" onClick={reservationClickHandler}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default DateTimeForm;
