import React, { useEffect, useState } from 'react';
import '../assets/styles/a4_userTable.css';

const UsePagination = ({ totalUsers, usersPerPage, paginate, currentPage }) => {
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState({
    min: 1,
    max: Math.ceil(totalUsers / usersPerPage),
    currentMin: 1,
    currentMax: 5,
  });

  useEffect(() => {
    setPages(
      Array.from(
        { length: page.currentMax - page.currentMin + 1 },
        (_, i) => page.currentMin + i,
      ),
    );
  }, [page]);

  const prevPage = currentPage => {
    if (currentPage <= page.min) return;

    if (page.currentMin >= currentPage)
      setPage({
        ...page,
        currentMin: page.currentMin - 5,
        currentMax: page.currentMin - 1,
      });

    paginate(currentPage - 1);
  };

  const nextPage = currentPage => {
    if (currentPage >= page.max) return;

    if (page.currentMax <= currentPage)
      setPage({
        ...page,
        currentMin: page.currentMax + 1,
        currentMax:
          page.currentMax + 5 > page.max ? page.max : page.currentMax + 5,
      });

    paginate(currentPage + 1);
  };

  return (
    <div className="usePaginationBox">
      <button
        className="pagination-button"
        onClick={() => {
          prevPage(currentPage);
        }}
      >
        {'<'}
      </button>
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className="page-item">
            <button
              onClick={() => paginate(page)}
              className="page-link"
              style={
                currentPage === page
                  ? { backgroundColor: 'rgb(151,32,32)', color: '#fff' }
                  : {}
              }
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="pagination-button"
        onClick={() => {
          nextPage(currentPage);
        }}
      >
        {'>'}
      </button>
    </div>
  );
};

export default UsePagination;
