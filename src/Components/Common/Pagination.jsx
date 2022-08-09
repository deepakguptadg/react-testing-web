import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ postsPerPage, totalPosts, paginate, setCurrentPage, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (currentPage === 1) {
        setCurrentPage(1);
      } else {
        setCurrentPage(currentPage - 1);
      }
    } else if (type === "next") {
      if (totalPosts === currentPage) {
        setCurrentPage(currentPage);
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
  };



  return (
    <nav>
      <ul className='pagination'>
        <li><Link to='' onClick={() => onButtonClick("prev")} className='page-link'>Previous</Link></li>
        {pageNumbers.map((number, index) => (
          <li  key={number} className='page-item' >
            <Link onClick={() => paginate(number)} to='' className={`page-link ${number === currentPage ? "active" : null}`}>
              {number}
            </Link>
          </li>
        ))} ...
        <li><Link to='' onClick={() => onButtonClick("next")} className='page-link'>Next</Link></li>
      </ul>
    </nav>
  );
};

export default Pagination;
