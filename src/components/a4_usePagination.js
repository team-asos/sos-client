import React, { useState } from 'react';
import '../assets/styles/a4_userTable.css';

const UsePagination = ({ totalUsers, usersPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="usePaginationBox">
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a 
            onClick={() => paginate(number)} 
            href="#" 
            className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsePagination;
