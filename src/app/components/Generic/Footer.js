import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <>
      <hr />
      <Row className='footer mb-2 py-5 mx-4 dark'>
        <Col >
          <Link to='/about'>
            <span className='text-muted fs-5 fw-bold'>Beckett Vault</span>
          </Link>
        </Col>
        <Col >
          <span className='text-muted'>Terms of Service</span>
          <span className='text-muted'>Privacy Policy</span>
          <span className='text-muted'>FAQ</span>
          <span className='text-muted'>Support</span>
        </Col>
        {/** TODO: Verify this should be 2021 */}
        <Col >
          <span className='text-muted'>&copy; Beckett, Inc. 2021</span>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
