import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

const Filter = () => {
  return (
    <Row className='row justify-content-center mb-3'>
      <Col lg='2'>
        <Form.Select size='sm' className='mr-3 rounded-pill'>
          <option selected>Filter</option>
          <option>Team</option>
          <option>Player</option>
          <option>Year</option>
          <option>Other</option>
        </Form.Select>
      </Col>
      <Col lg='2'>
        <Form.Select size='sm' className='mr-3 rounded-pill'>
          <option selected>Sort</option>
          <option>Name A-Z</option>
          <option>Name Z-A</option>
          <option>Oldest</option>
          <option>Newest</option>
          <option>Most Expensive</option>
          <option>Least Expensive</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Filter;
