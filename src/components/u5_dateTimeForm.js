import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import '../assets/styles/u5_dateTimeForm.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/u2_calendar.css';

//좌석 예약 페이지->이용 시간 선택
const DateTimeForm = ({ selection, userId }) => {
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
