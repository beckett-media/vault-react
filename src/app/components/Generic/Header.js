import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TopNav from './TopNav';

const Header = () => {
  return (
    <Col className='mb-3'>
      <Row className='justify-content-md-center'>
        <TopNav />
      </Row>
    </Col>
  );
};

export default Header;
