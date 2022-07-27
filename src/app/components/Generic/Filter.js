import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

const Filter = (props) => {
  const { searchVal, setSearchVal, setSortBy } = props;
  // add onSearch, onSort props.
  return (
    <Row className='row'>
      <Col sm='8'>
        <Form.Control
          type='search'
          placeholder='Search'
          size='sm'
          className='rounded-pill'
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </Col>
      <Col sm='4'>
        <Form.Select size='sm' className='rounded-pill' onChange={(e) => setSortBy(e.target.value)}>
          <option selected>Sort</option>
          <option value='subject'>Name A-Z</option>
          <option value='subject-reverse'>Name Z-A</option>
          <option value='date'>Oldest</option>
          <option value='date-reverse'>Newest</option>
          <option value='est_value-reverse'>Most Expensive</option>
          <option value='est_value'>Least Expensive</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Filter;
