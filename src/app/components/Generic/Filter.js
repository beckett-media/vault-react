import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const Filter = () => {
  // add onSearch, onSort props.
  return (
    <Row className='row justify-content-center mb-3'>
      <Col lg='4'>
        <Form.Control
          type='search'
          placeholder='Search'
          size='sm'
          className='mr-3 rounded-pill'
        />
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
