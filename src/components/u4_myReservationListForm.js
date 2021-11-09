import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import MyReservationData from '../assets/data/myReservationList';
import '../assets/styles/u4_myReservationListForm.css';
//마이페이지->나의 예약 내역 조회/취소

function MyReservationListForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="myReservationListForm">
      <p className="myReservationListFormTitleTextStyle">나의 예약 조회/취소</p>
      <Table striped hover className="myReservationListTable">
        <thead>
          <tr>
            <th></th>
            <th>이용 날짜</th>
            <th>이용 시간</th>
            <th>예약 정보</th>
            <th>상태</th>
            <th></th>
          </tr>
        </thead>
        {MyReservationData.listData.map((item, idx) => (
          <tbody>
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.reseration_date}</td>
              <td> {item.reservation_time}</td>
              <td>
                {item.floor_id}층 {item.seat_id}번
              </td>
              <td>
                {item.status === 0
                  ? '예약완료'
                  : item.status === 1
                  ? '사용중'
                  : '사용완료'}
              </td>
              {item.status == 0 ? ( //예약완료 상태면(좌석/회의실 예약을 구분할 수 있는 상태가 필요?)
                <td style={{ marginLeft: '10vw' }}>
                  <button className="reservationCancelBtn" onClick={handleShow}>
                    예약취소
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
                </td>
              ) : item.status == 1 ? ( //사용중이면
                <td style={{ marginLeft: '10vw' }}>
                  <>
                    <button className="checkOutBtn" onClick={handleShow}>
                      퇴실하기
                    </button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>좌석 {item.seat_id}번</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>퇴실 하시겠습니까?</Modal.Body>
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
                </td>
              ) : (
                <td></td>
              )}
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
}
export default MyReservationListForm;
