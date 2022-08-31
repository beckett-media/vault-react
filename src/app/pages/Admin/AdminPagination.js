import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const items = [0, 1, 2, 3, 4];
const pageCount = 5;

function AdminPagination({ minPage = 1, maxPage = 100, currentPage, onPageSelect }) {
  const startIndex = Math.floor((currentPage - minPage) / pageCount) * pageCount + minPage;

  const handlePrevClick = () => {
    if (currentPage > minPage) {
      onPageSelect(currentPage - 1);
    }
  };

  const handleFirstClick = () => {
    onPageSelect(minPage);
  };

  const handleNextClick = () => {
    if (maxPage && currentPage < maxPage) {
      onPageSelect(currentPage + 1);
    }
  };

  const handleLastClick = () => {
    if (maxPage) {
      onPageSelect(maxPage);
    }
  };

  return (
    <Pagination>
      <Pagination.First onClick={handleFirstClick} />
      <Pagination.Prev onClick={handlePrevClick} />
      {minPage + pageCount - 1 < startIndex ? <Pagination.Ellipsis /> : null}
      {items.map((id) => (
        <Pagination.Item
          key={id}
          active={currentPage === startIndex + id}
          onClick={() => onPageSelect(startIndex + id)}
        >
          {startIndex + id}
        </Pagination.Item>
      ))}
      {maxPage && startIndex + pageCount - 1 < maxPage ? <Pagination.Ellipsis /> : null}
      <Pagination.Next onClick={handleNextClick} />
      <Pagination.Last disabled={!maxPage} onClick={handleLastClick} />
    </Pagination>
  );
}

export default AdminPagination;
