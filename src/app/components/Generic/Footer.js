import React from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <>
      <hr />
      <Row className='footer mb-2 py-5 mx-4 dark'>
        <Col sm={2}>
          <Link to='/'>
            <span className='text-muted fs-5 fw-bold'>Beckett Vault</span>
          </Link>
        </Col>
        <Col sm={6}>
          <Row>
            <Col xl={4} className='d-flex justify-content-center'>
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                placement='bottom'
              >
                {/* to='/terms' */}
                 <Link to='#'>
                  <div className='text-muted fw-bold'>Terms of Service</div>
                </Link>
              </OverlayTrigger>
            </Col>
            <Col xl={3} className='d-flex justify-content-center'>
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                placement='bottom'
              >
                {/* to='/privacy' */}
                 <Link to='#'>
                  <div className='text-muted fw-bold'>Privacy Policy</div>
                </Link>
              </OverlayTrigger>
            </Col>
            <Col xl={2} className='d-flex justify-content-center'>
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                placement='bottom'
              >
                 {/* to='/faq' */}
                 <Link to='#'>
                  <div className='text-muted fw-bold'>FAQ</div>
                </Link>
              </OverlayTrigger>
            </Col>
            <Col xl={2} className='d-flex justify-content-center'>
              <OverlayTrigger
                delay={{ hide: 450, show: 300 }}
                overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                placement='bottom'
              >
                {/* to='/support' */}
                 <Link to='#'>
                  <div className='text-muted fw-bold'>Support</div>
                </Link>
              </OverlayTrigger>
            </Col>
          </Row>
        </Col>
        {/** TODO: Verify this should be 2021 */}
        <Col sm={2}>
          <div className='text-muted align-right'>&copy; Copyright © 2022, Beckett Collectibles, LLC. All rights reserved.</div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
