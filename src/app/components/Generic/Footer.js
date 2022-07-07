import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <>
      <hr />
      <Row className='footer mb-2 py-5 mx-4 dark'>
        <Col>
          <Link to='/about'>
            <span className='text-muted fs-5 fw-bold'>Beckett Vault</span>
          </Link>
        </Col>
        <Col>
          <Row>
            <Col xs={4}>
              <div className='text-muted fw-bold'>Terms of Service</div>
            </Col>
            <Col xs={3}>
              <div className='text-muted fw-bold'>Privacy Policy</div>
            </Col>
            <Col xs={2}>
              <div className='text-muted fw-bold'>FAQ</div>
            </Col>
            <Col xs={2}>
              <div className='text-muted fw-bold'>Support</div>
            </Col>
          </Row>
        </Col>
        {/** TODO: Verify this should be 2021 */}
        <Col>
          <div className='text-muted align-right'>
            &copy; Beckett, Inc. 2021
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
