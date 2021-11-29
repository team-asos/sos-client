import React, { useState, forwardRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useMediaQuery } from 'react-responsive';
import { ko } from 'date-fns/esm/locale';
import { addDays, formatISO, formatISO9075 } from 'date-fns';
import '../assets/styles/u5_dateTimeForm.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/u2_calendar.css';
import * as FaIcon from 'react-icons/fa';
import UserSearchForm from './u5_userSearchForm';
import formatISODuration from 'date-fns/formatISODuration';

//좌석 예약 페이지->이용 시간 선택
const DateTimeForm = ({ selection, userId }) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const now = new Date();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /*좌석 사용 시작 */
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
          seatId: Number(selection.id),
          userId: Number(userId),
        }),
      },
    );
    if (response.status === 201) {
      alert('좌석 사용이 시작되었습니다!');
    } else {
      alert(response.status);
    }
  };

  return (
    <div className={isPc ? 'reservationAndSearch' : 'm_reservationAndSearch'}>
      <div className={isPc ? 'dateTimeAndBtnForm' : 'm_dateTimeAndBtnForm'}>
        <div className={isPc ? 'dateTimeForm' : 'm_dateTimeForm'}>
          <div className={isPc ? 'seatNameTextStyle' : 'm_seatNameTextStyle'}>
            좌석 {selection.name}
          </div>

          <div
            className={
              isPc ? 'seatReservationButtonForm' : 'm_seatReservationButtonForm'
            }
          >
            <button
              className={isPc ? 'seatReservationBtn' : 'm_seatReservationBtn'}
              onClick={handleShow}
            >
              사용 시작
            </button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>좌석 {selection.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>사용 하시겠습니까?</Modal.Body>
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
      {/* <UserSearchForm /> */}
    </div>
  );
};
export default DateTimeForm;
