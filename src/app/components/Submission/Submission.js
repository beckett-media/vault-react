import React from 'react';
import { Col, Collapse, Container, Row } from 'react-bootstrap';
import Header from '../Generic/Header';
import Footer from '../Generic/Footer';
import '../index.scss';

const Submission = () => {
  return (
    <Container fluid style={{ background: 'black' }}>
      <Header />
      <div>submission</div>
      <Footer />
    </Container>
  );
};

export default Submission;
