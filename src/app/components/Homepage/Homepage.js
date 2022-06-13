import React, { useEffect, useState } from 'react'
import { Col, Collapse, Container, Row } from 'react-bootstrap'
import '../../../index.css'
import Footer from '../Generic/Footer';
import Header from '../Generic/Header';
import InterestForm from './InterestForm';

const Homepage = () => {
    const [open, setOpen] = useState(false);
    useEffect(() => setOpen(true),[])

    return (
        <Container fluid style={{background: 'black'}} >
            <Header />
            <Row className="justify-content-md-center mt-2">
                <Collapse in ={open} timeout={3000}>
                    <Col xs={5} style={{fontSize: 33, color: '#C0C0C0', fontWeight:'bolder'}}>
                        {'Pioneer the Frontier of Digital & Physical Collectibles'}
                    </Col>
                </Collapse>
                <Col xs={5} style={{fontSize: 33, color: '#C0C0C0', fontWeight:'bolder'}}>
                    {'Pioneer the Frontier of Digital & Physical Collectibles'}
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-1">
                <input type="button" 
                    className='border border-info rounded-pill ghost-btn' 
                    value='Begin your Journey'
                />
            </Row>
            <InterestForm /> 
            <Footer />
      </Container>
  )
}

export default Homepage