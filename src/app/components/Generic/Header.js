import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Nav from './Nav';

const Header = () => {
  return (
    <Col>
      <Row className="justify-content-md-center">
        <Nav />
      </Row>
    </Col>
  );
};

export default Header;
