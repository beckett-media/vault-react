import React, { useEffect, useState } from 'react';
import { Col, Collapse, Container, Row } from 'react-bootstrap';
import InterestForm from './InterestForm';
import './Homepage.scss';

const Homepage = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(true), []);

  return (
    <Container>
      <Row className='justify-content-md-center mt-2'>
        <Collapse in={open} timeout={3000}>
          <Col className='title' align='center'>
            {'Pioneer the Frontier of Digital & Physical Collectibles'}
          </Col>
        </Collapse>
      </Row>
      <Row className='justify-content-md-center mt-1 mb-3'>
        <Col className='title' align='center'>
          <input
            type='button'
            className='rounded-pill ghost-btn btn-sm'
            value='Begin your Journey'
          />
        </Col>
      </Row>
      <InterestForm />
    </Container>
  );
};

export default Homepage;
