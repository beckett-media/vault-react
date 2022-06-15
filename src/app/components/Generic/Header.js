import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Header = () => {
  return (
    <Row className="justify-content-md-center">
      <Col xs={1} style={{ background: 'gray' }}>
        Beckett Logo
      </Col>
    </Row>
  );
};

export default Header;
