import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';

import '../assets/styles/u5_dateTimeForm.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/u2_calendar.css';

const ReserveModal = ({ selection, userId, board, setBoard }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isClicked = useCallback(() => {
    if (selection.name !== '') handleShow();
  }, [selection]);

  useEffect(() => {
    if (selection !== null) isClicked();
  }, [isClicked, selection]);

  const reserveSeat = async () => {
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
      const json = await response.json();

      const seat = json.seat;
      const user = json.user;

      setBoard(
        board.map((row, y) =>
          row.map((col, x) => {
            if (x === seat.x && y === seat.y)
              return { ...col, name: user.name, type: 5 };

            return col;
          }),
        ),
      );

      alert('좌석 사용이 시작되었습니다!');
    } else {
      alert('좌석을 사용할 수 없습니다.');
    }
  };

  const reservationClickHandler = async () => {
    reserveSeat();
    handleClose();
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
export default ReserveModal;
