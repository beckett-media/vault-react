import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

const Filter = ({ searchVal, setSearchVal, setSortBy, sortOptions, setFilterBy, filterOptions }) => {
  // add onSearch, onSort props.
  return (
    <Row className='row'>
      {searchVal !== undefined && (
        <Col sm='4'>
          <Form.Control
            type='search'
            placeholder='Search'
            size='sm'
            className='rounded-pill'
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </Col>
      )}
      {sortOptions && (
        <Col sm='4'>
          <Form.Select size='sm' className='rounded-pill' onChange={(e) => setSortBy(e.target.value)}>
            <option selected>Sort</option>
            {sortOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.title}
              </option>
            ))}
          </Form.Select>
        </Col>
      )}
      {filterOptions && (
        <Col sm='4'>
          <Form.Select size='sm' className='rounded-pill' onChange={(e) => setFilterBy(e.target.value)}>
            <option selected>Filter</option>
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
