import React, { useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';

const Filter = ({ searchVal, setSearchVal, setSortBy, sortOptions, setFilterBy, filterOptions, filterBy }) => {
  const base = () => {
    if (searchVal && sortOptions && filterOptions) {
      return 3;
    } else if (!filterOptions && !sortOptions) {
      return 6;
    } else return 4;
  };
  // add onSearch, onSort props.

  return (
    <Row className='row'>
      {searchVal !== undefined && (
        <Col md={2 * base()}>
          <Form.Control
            type='search'
            placeholder='Search'
            size='md'
            className='rounded-pill mb-0'
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </Col>
      )}
      {sortOptions && (
        <Col md={base()}>
          <Form.Select
            size='md'
            className='rounded-pill mb-0'
            defaultValue='Sort'
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value='Sort'>Sort</option>
            {sortOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.title}
              </option>
            ))}
          </Form.Select>
        </Col>
      )}
      {filterOptions && (
        <Col md={base()}>
          <Form.Select
            id='filter-select'
            size='md'
            className='rounded-pill mb-0'
            defaultValue='Filter'
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value='Filter'>Filter</option>
            {filterOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.title}
              </option>
            ))}
          </Form.Select>
        </Col>
      )}
    </Row>
  );
};

export default Filter;
