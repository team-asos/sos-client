import React, { useState, useEffect } from 'react';
import '../assets/styles/a4_userTable.css';

import Button from 'react-bootstrap/Button';
import UserDetailModalContent from './a4_userDetailModal';
import tableHeadertoKR from './a4_tableHeadertoKR';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import UsePagination from './a4_usePagination';

export default function UserTable({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  useEffect(() => {
    console.log(modalInfo);
  }, [modalInfo]);

  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <MDBTable hover className="userTable" cellPadding={0} cellSpacing={0}>
        {/* 헤더 */}
        <MDBTableHead>
          <tr>
            {data[0] &&
              columns.map(heading =>
                heading === 'role' ? '' : <th>{tableHeadertoKR(heading)}</th>,
              )}
          </tr>
        </MDBTableHead>
        {/* 바디 */}
        <MDBTableBody>
          {currentUsers.map(row => (
            <tr>
              {columns.map(column =>
                column === 'role' ? '' : <td>{row[column]}</td>,
              )}
              <td>
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
      </MDBTable>
      <UsePagination
        totalUsers={data.length}
        usersPerPage={userPerPage}
        paginate={paginate}
      />
    </div>
  );
}
