import React, { useEffect, useState } from 'react'
import { Col, Collapse, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import '../../../index.css'
import Footer from '../Generic/Footer';
import Header from '../Generic/Header';

const SubmissionForm = () => {

    return (
        <Container fluid style={{background: 'black'}} >
            <Header />
            <Footer />
      </Container>
  )
}

export default SubmissionForm