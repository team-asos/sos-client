import React, { useState } from 'react';
import '../assets/styles/a4_userTable.css';

import { Link } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export default function userTable({ match, data }) {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <MDBTable hover className="userTable" cellPadding={0} cellSpacing={0}>
      <MDBTableHead>
        <tr>{data[0] && columns.map(heading => <th>{heading}</th>)}</tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map(row => (
          <tr>
            {columns.map(column => (
              <td>{row[column]}</td>
            ))}

            <td key={row['id']}>
              <Link to={`/user-management/${row['id']}`}>
                <button
                  className="userInfoBtn"
                  onClick={() => console.log(row)}
                >
                  조회하기
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
