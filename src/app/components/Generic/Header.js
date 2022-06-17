import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Nav from './Nav';

const Header = () => {
  return (
    <Row className="justify-content-md-center">
      <Col xs={1} style={{ background: 'gray' }}>
        Beckett Logo
      </Col>
      <Nav />
    </Row>
  );
};

export default Header;
