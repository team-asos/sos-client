import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import tableHeadertoKR from './a4_tableHeadertoKR';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export default function UserDetailModalContent({
  show,
  handleClose,
  modalInfo,
  data,
  columns,
}) {
  const [reservation, setReservation] = useState([]);

  const reservationTitle = ['타입', '번호', '사용시간'];

  useEffect(() => {
    const res = async id => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/search?userId=${id}`,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(json => {
          setReservation(json);
        });
    };
    res(modalInfo.id);
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centereddialogClassName="modal-180w"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontWeight: 'bold' }}
        >
          {modalInfo['name']}
          <span style={{ fontSize: 'large' }}> 님의 정보</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{ fontWeight: 'bold', color: '#c00000' }}>회원 정보</h5>
        <MDBTable hover className="userTable" cellPadding={0} cellSpacing={0}>
          <MDBTableHead>
            <tr>
              {data[0] &&
                columns.map(heading =>
                  heading === 'role' || heading === 'id' ? (
                    ''
                  ) : (
                    <th>{tableHeadertoKR(heading)}</th>
                  ),
                )}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              {columns.map(column =>
                column === 'role' || column === 'id' ? (
                  ''
                ) : (
                  <td>{modalInfo[column]}</td>
                ),
              )}
            </tr>
          </MDBTableBody>
        </MDBTable>
        <h5 style={{ fontWeight: 'bold', color: '#c00000' }}>예약 내역</h5>
        {/* 예약내역 존재여부 판별 */}
        {reservation.length === 0 ? (
          <p>예약 내역이 존재하지 않습니다.</p>
        ) : (
          <MDBTable hover className="userTable" cellPadding={0} cellSpacing={0}>
            <MDBTableHead>
              <tr>
                {reservationTitle.map(heading => (
                  <th>{heading}</th>
                ))}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                {reservation.map((item, idx) =>
                  item.roomId === null ? <td>회의실</td> : <td>좌석</td>,
                )}
              </tr>
            </MDBTableBody>
          </MDBTable>
        )}

        <h5 style={{ fontWeight: 'bold', color: '#c00000' }}>문의 내역</h5>
        <p>DB연결 후 불러오기</p>
      </Modal.Body>
    </Modal>
  );
}
