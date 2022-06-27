import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Filter = () => {
  return (
    <Row className='row justify-content-center mb-3'>
      <Col lg='2'>
        <select className='form-select form-select-sm mr-3 rounded-pill'>
          <option selected>Filter</option>
          <option>Team</option>
          <option>Player</option>
          <option>Year</option>
          <option>Other</option>
        </select>
      </Col>
      <Col lg='2'>
        <select className='form-select form-select-sm mr-3 rounded-pill'>
          <option selected>Sort</option>
          <option>Name A-Z</option>
          <option>Name Z-A</option>
          <option>Oldest</option>
          <option>Newest</option>
          <option>Most Expensive</option>
          <option>Least Expensive</option>
        </select>
      </Col>
    </Row>
  );
};

export default Filter;
