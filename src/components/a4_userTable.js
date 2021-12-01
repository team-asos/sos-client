import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Button from 'react-bootstrap/Button';

import UserDetailModalContent from './a4_userDetailModal';
import UsePagination from './a4_usePagination';

import '../assets/styles/a4_userTable.css';

export default function UserTable({ data }) {
  //헤더들
  const columns = data[0] && Object.keys(data[0]);

  //모달 관련 함수
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  useEffect(() => {}, [modalInfo]);

  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <MDBTable
        hover
        className="userTable"
        cellPadding={0}
        cellSpacing={0}
        maxHeight="80vh"
      >
        {/* 헤더 */}
        <MDBTableHead>
          <tr key={-1} style={{ fontSize: '0.8em' }}>
            <th></th>
            <th>이메일</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>사원번호</th>
            <th>부서</th>
            <th>직급</th>
            <th>생성일자</th>
            <th>수정일자</th>
            <th></th>
          </tr>
        </MDBTableHead>

        {/* 바디 */}
        <MDBTableBody>
          {currentUsers.map((row, idx) => (
            <tr
              key={row.id}
              style={{
                fontSize: '1em',
                height: '8vh',
              }}
            >
              <td>{idx + 1}</td>
              <td>{row.email}</td>
              <td>{row.name}</td>
              <td>{row.tel}</td>
              <td>{row.employeeId}</td>
              <td>{row.department}</td>
              <td>{row.position}</td>
              <td>{row.createdAt.slice(0, 10)}</td>
              <td>{row.updatedAt.slice(0, 10)}</td>

              <td style={{ fontSize: '1em' }}>
                <Button
                  variant="outline-danger"
                  size="sm"
                  animation="false"
                  onClick={e => {
                    setModalInfo(row);
                    toggleTrueFalse();
                  }}
                >
                  조회하기
                </Button>

                {show ? (
                  <UserDetailModalContent
                    show={show}
                    handleClose={handleClose}
                    modalInfo={modalInfo}
                    data={data}
                    columns={columns}
                  />
                ) : (
                  ''
                )}
              </td>
            </tr>
          ))}
        </MDBTableBody>
        <MDBTableBody>
          <UsePagination
            totalUsers={data.length}
            usersPerPage={userPerPage}
            paginate={paginate}
          />
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
