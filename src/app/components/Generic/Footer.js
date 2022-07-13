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
          <Link to='/'>
            <span className='text-muted fs-5 fw-bold'>Beckett Vault</span>
          </Link>
        </Col>
        <Col>
          <Row>
            <Col xs={4}>
              <Link to='/terms'>
                <div className='text-muted fw-bold'>Terms of Service</div>
              </Link>
            </Col>
            <Col xs={3}>
              <Link to='/privacy'>
                <div className='text-muted fw-bold'>Privacy Policy</div>
              </Link>
            </Col>
            <Col xs={2}>
              <Link to='/faq'>
                <div className='text-muted fw-bold'>FAQ</div>
              </Link>
            </Col>
            <Col xs={2}>
              <Link to='/support'>
                <div className='text-muted fw-bold'>Support</div>
              </Link>
            </Col>
          </Row>
        </Col>
        {/** TODO: Verify this should be 2021 */}
        <Col>
          <div className='text-muted align-right'>&copy; Beckett, Inc. 2022</div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
