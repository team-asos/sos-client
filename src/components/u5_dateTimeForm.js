import React, { useState, forwardRef, useEffect } from 'react';
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
import { SELECTION_SECOND } from '../const/selection-type.const';

//좌석 예약 페이지->이용 시간 선택
const DateTimeForm = ({ selection, userId }) => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const now = new Date();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isClicked = () => {
    if (selection.name.length > 0) {
      handleShow();
    }
  };
  useEffect(() => {
    if (selection !== null) isClicked();
  }, [selection]);
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
      window.location.href = '/seat-reservation';
    } else {
      alert(response.status);
    }
  };

  return (
    <>
      {selection.name.length > 0 ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>좌석 {selection.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>사용 하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="danger" onClick={reservationClickHandler}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};
export default DateTimeForm;
