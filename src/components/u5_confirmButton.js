import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';

function ButtonForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        size="lg"
        style={{
          width: '10vw',
          alignSelf: 'center',
        }}
      >
        예약하기
      </Button>

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
    </>
  );
}

export default ButtonForm;
