import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MyReservationData from '../assets/data/myReservationList';
import '../assets/styles/u4_myReservationListForm.css';
//마이페이지->나의 예약 내역 조회/취소

function MyReservationListForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const clickHandler = id => {
    if (MyReservationData.listData[id].status == 0) {
      return '예약 취소';
    } else if (MyReservationData.listData[id].status == 1) {
      return '퇴실 하기';
    } else return null;
  };

  return (
    <div className="myReservationListForm">
      <p className="myReservationListFormTitleTextStyle">나의 예약 조회/취소</p>

      <div className="myReservationList">
        {MyReservationData.listData.map((item, idx) => (
          <div
            key={idx}
            className="myReservationDetail"
            onClick={clickHandler => idx}
          >
            <p className="rvDate">{item.reseration_date}</p>

            <p className="rvTime">{item.reservation_time}</p>
            <p className="rvFloor">{item.floor_id}층</p>
            <p className="rvSeatNum">{item.seat_id}번</p>
            <p className="rvStatus">
              {item.status == 0
                ? '예약완료'
                : item.status == 1
                ? '사용중'
                : '사용완료'}
            </p>

            {item.status == 0 ? ( //예약완료 상태면(좌석/회의실 예약을 구분할 수 있는 상태가 필요?)
              <>
                <button className="reservationCancelBtn" onClick={handleShow}>
                  예약 취소
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>좌석 {item.seat_id}번</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>예약을 취소하시겠습니까?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      취소
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                      확인
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : item.status == 1 ? ( //사용중이면
              <>
                <button className="checkOutBtn" onClick={handleShow}>
                  퇴실 하기
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>좌석 {item.seat_id}번</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>퇴실하시겠습니까?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      취소
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                      확인
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : (
              //칸 맞추기용
              <div className="noneBtn"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default MyReservationListForm;
