import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Modal from 'react-bootstrap/Modal';
import tableHeadertoKR from './a4_tableHeadertoKR';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import '../assets/styles/a4_userDetailBox.css';

import * as fa from 'react-icons/fa';

export default function UserDetailModalContent({
  show,
  handleClose,
  modalInfo,
  data,
  columns,
}) {
  const [reservation, setReservation] = useState([]);
  const [cookie] = useCookies('access_token');

  //예약 내역 테이블 헤더
  const reservationTitle = [
    '타입',
    '번호',
    '사용날짜',
    '입실시간',
    '퇴실시간',
    '이용상태',
  ];

  //예약 내역 불러오기
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

  const [inquiry, setInquiry] = useState('');
  //문의 내역 테이블 헤더
  const inquiryTitle = ['상태', '문의내용', '답변내용', '문의날짜', '답변날짜'];
  //문의 내역 불러오기
  useEffect(() => {
    const res = async id => {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/questions/search?userId=${id}`,
        {
          headers: { Authorization: `Bearer ${cookie.access_token}` },
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(json => {
          setInquiry(json);
        });
    };
    res(modalInfo.id);
  }, []);

  //유저 삭제 버튼 동작
  const deleteUserHandler = async id => {
    const result = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/users/${id}`,
      {
        headers: { Authorization: `Bearer ${cookie.access_token}` },
        method: 'DELETE',
      },
    );
    if (result.status === 200) {
      alert('유저 삭제를 성공하였습니다.');
      window.location.href = '/user-management';
    }
  };

  return (
    //모달창 불러오기
    <Modal
      show={show}
      onHide={handleClose}
      scrollable={true}
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
      {/* 회원 정보 조회 테이블*/}
      <Modal.Body>
        <h6 style={{ fontWeight: 'bold', color: '#c00000' }}>
          <fa.FaUser
            style={{ color: 'gray', marginRight: '0.4%', marginTop: '-0.2%' }}
          />
          회원 정보
        </h6>
        <MDBTable hover className="userTable" cellPadding={0} cellSpacing={0}>
          <MDBTableHead>
            <tr style={{ fontSize: 'smaller' }}>
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
            <tr style={{ fontSize: 'smaller' }}>
              {columns.map(column =>
                column === 'role' || column === 'id' ? (
                  ''
                ) : column === 'createdAt' || column === 'updatedAt' ? (
                  <td>{modalInfo[column].slice(0, 10)}</td>
                ) : (
                  <td>{modalInfo[column]}</td>
                ),
              )}
            </tr>
          </MDBTableBody>
        </MDBTable>

        {/* 예약 내역 조회 테이블 */}
        <h6 style={{ fontWeight: 'bold', color: '#c00000' }}>
          <fa.FaRegistered
            style={{ color: 'gray', marginRight: '0.4%', marginTop: '-0.2%' }}
          />
          예약 내역
        </h6>
        {/* 예약내역 존재여부 판별 */}
        {reservation.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: 'gray', fontSize: 'small' }}>
            &nbsp; &nbsp;&nbsp; 예약 내역이 존재하지 않습니다.
          </p>
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
              {reservation.map(item =>
                item.room === null ? (
                  //좌석일 경우
                  <tr>
                    <td>좌석</td>
                    <td></td>
                    <td>{item.startTime.slice(0, 10)}</td>
                    <td>{item.startTime.slice(12, 19)}</td>
                    <td>{item.endTime.slice(12, 19)}</td>
                    {item.status === 0 ? <td>사용완료</td> : <td>사용중</td>}
                  </tr>
                ) : (
                  //회의실일 경우
                  <tr>
                    <td>회의실</td>
                    <td></td>
                    <td>{item.startTime.slice(0, 10)}</td>
                    <td>{item.startTime.slice(12, 19)}</td>
                    <td>{item.endTime.slice(12, 19)}</td>
                    {item.status === 0 ? <td>사용완료</td> : <td>사용중</td>}
                  </tr>
                ),
              )}
            </MDBTableBody>
          </MDBTable>
        )}

        {/* 문의 내역 조회 테이블 */}
        <h6 style={{ fontWeight: 'bold', color: '#c00000' }}>
          <fa.FaTelegramPlane
            style={{ color: 'gray', marginRight: '0.4%', marginTop: '-0.2%' }}
          />
          문의 내역
        </h6>
        {/* 문의 내역 존재 여부 판별 */}
        {inquiry.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: 'gray', fontSize: 'small' }}>
            &nbsp; &nbsp;&nbsp;문의 내역이 존재하지 않습니다.
          </p>
        ) : (
          <MDBTable hover className="userTable" cellPadding={0} cellSpacing={0}>
            <MDBTableHead>
              <tr style={{ fontSize: 'small' }}>
                {inquiryTitle.map(heading => (
                  <th>{heading}</th>
                ))}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {inquiry.map(item => (
                <tr style={{ fontSize: 'small' }}>
                  {item.status === 0 ? (
                    <td style={{ color: 'red', width: '6%' }}>답변대기</td>
                  ) : (
                    <td style={{ color: 'green', width: '6%' }}>답변완료</td>
                  )}
                  <td style={{ width: '32%' }}>{item.message}</td>
                  <td style={{ width: '32%' }}>{item.answer?.message}</td>
                  <td style={{ width: '8%' }}>{item.createdAt.slice(0, 10)}</td>
                  {item.status === 1 ? (
                    <td style={{ width: '8%' }}>
                      {item.answer?.createdAt.slice(0, 10)}
                    </td>
                  ) : (
                    <td style={{ width: '8%' }} style={{ fontSize: 'small' }}>
                      -
                    </td>
                  )}
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        )}
      </Modal.Body>{' '}
      <Modal.Footer>
        <button
          className="deleteUserButton"
          onClick={() => {
            deleteUserHandler(modalInfo.id);
          }}
        >
          삭제하기
        </button>
      </Modal.Footer>
    </Modal>
  );
}
