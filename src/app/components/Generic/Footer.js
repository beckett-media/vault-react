import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <Row className="justify-content-md-center mt-3">
      <Col xs={1}>
        <img src="/images/beckett-logo.svg" />
      </Col>
    </Row>
  );
};

export default Footer;
