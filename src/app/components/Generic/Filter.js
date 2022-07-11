import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

const Filter = (props) => {
  const { searchVal, setSearchVal, setSortBy } = props;
  // add onSearch, onSort props.
  return (
    <Row className='row justify-content-center mb-3'>
      <Col lg='4'>
        <Form.Control
          type='search'
          placeholder='Search'
          size='sm'
          className='mr-3 rounded-pill'
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </Col>
      <Col lg='2'>
        <Form.Select
          size='sm'
          className='mr-3 rounded-pill'
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option selected>Sort</option>
          <option value='title'>Name A-Z</option>
          <option value='title-reverse'>Name Z-A</option>
          <option value='date'>Oldest</option>
          <option value='date-reverse'>Newest</option>
          <option value='price-reverse'>Most Expensive</option>
          <option value='price'>Least Expensive</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Filter;
