import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

export const usePagination = (sortedItems) => {
  const [activePage, setActivePage] = useState(1);

  const findPaginationCount = (totalItemCount, totalItemsPerPage) => {
    return Math.ceil(totalItemCount / totalItemsPerPage);
  };

  const paginationItems = [];
  const totalPages = findPaginationCount(sortedItems.length, 16);

  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={'pagination_' + i}
        active={i === activePage}
        onClick={(e) => setActivePage(e.target.text - 0)}
        className={i === activePage && 'pe-none'}
      >
        {i}
      </Pagination.Item>,
    );
  }

  const updatePage = (array, pageNumber) => {
    const upperBound = pageNumber * 16;
    const lowerBound = upperBound - 16;
    return array.slice(lowerBound, upperBound);
  };

  return { activePage, paginationItems, updatePage };
};
