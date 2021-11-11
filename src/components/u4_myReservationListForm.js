import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import '../assets/styles/u4_myReservationListForm.css';
//마이페이지->나의 예약 내역 조회/취소

const MyReservationListForm = props => {
  const [show, setShow] = useState(false);
  const [reservation, setReservation] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /*내 id */
  const res = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/search?userId=${props.user.id}`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        setReservation(json);
      });
  };
  useEffect(() => {
    if (props.user.id !== 'undefined') res();
  }, [props.user.id]);

  /*예약 취소*/
  const deleteReservation = reservationId => {
    const res = async () => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/${reservationId}`,
        {
          method: 'DELETE',
        },
      );
      // .then(response => response.json())
      // .then(json => {
      //   setReservation(json);
      // });
      console.log(res);
      if (res.status === 200) {
        alert('예약이 취소되었습니다.');
      }
    };
  };
  return (
    <div className="myReservationListForm">
      <p className="myReservationListFormTitleTextStyle">나의 예약 조회/취소</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="seatReservationList">
          <div className="u4seatTextStyle">좌석</div>
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
            {reservation.map((item, idx) =>
              item.room == null ? (
                <tbody>
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.startTime.slice(0, 10)}</td>
                    <td>
                      {item.startTime.slice(11, 19)}-
                      {item.endTime.slice(11, 19)}
                    </td>
                    <td>
                      {item.seat.floor.name} {item.seat.name}
                    </td>
                    <td>
                      {item.status === 0
                        ? '예약완료'
                        : item.status === 1
                        ? '사용중'
                        : '사용완료'}
                    </td>
                    {item.status === 0 ? ( //예약완료 상태면(좌석/회의실 예약을 구분할 수 있는 상태가 필요?)
                      <td style={{ marginLeft: '10vw' }}>
                        <button
                          className="reservationCancelBtn"
                          onClick={handleShow}
                        >
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
                            <Button
                              variant="danger"
                              onClick={deleteReservation(item.id)}
                            >
                              확인
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    ) : item.status === 1 ? ( //사용중이면
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
              ) : (
                ''
              ),
            )}
          </Table>
        </div>
        <div className="roomReservationList">
          <div className="u4roomTextStyle">회의실</div>
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
            {reservation.map((item, idx) =>
              item.seat == null ? (
                <tbody>
                  <tr key={reservation.length - idx}>
                    <td>{idx + 1}</td>
                    <td>{item.startTime.slice(0, 10)}</td>
                    <td>
                      {item.startTime.slice(11, 19)}-
                      {item.endTime.slice(11, 19)}
                    </td>
                    <td>{item.room.name}</td>
                    <td>
                      {item.status === 0
                        ? '예약완료'
                        : item.status === 1
                        ? '사용중'
                        : '사용완료'}
                    </td>
                    {item.status === 0 ? ( //예약완료 상태면(좌석/회의실 예약을 구분할 수 있는 상태가 필요?)
                      <td style={{ marginLeft: '10vw' }}>
                        <button
                          className="reservationCancelBtn"
                          onClick={handleShow}
                        >
                          예약취소
                        </button>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>{item.room.name}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>예약을 취소하시겠습니까?</Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              취소
                            </Button>
                            <Button
                              variant="danger"
                              onClick={deleteReservation(item.id)}
                            >
                              확인
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    ) : item.status === 1 ? ( //사용중이면
                      <td style={{ marginLeft: '10vw' }}>
                        <>
                          <button className="checkOutBtn" onClick={handleShow}>
                            퇴실하기
                          </button>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>{item.room.name}</Modal.Title>
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
              ) : (
                ''
              ),
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};
export default MyReservationListForm;
