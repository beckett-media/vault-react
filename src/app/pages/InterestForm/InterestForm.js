import React, { useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { validEmail, validPhone } from '../../utils/validationRegex';
import { postInterestForm } from '../../services/interest';

import './InterestForm.scss';

const InterestForm = (props) => {
  const [isValidEmail, setValidEmail] = useState(true);
  const [isValidPhone, setValidPhone] = useState(true);

  const validateEmail = (email) => {
    const isValid = validEmail.test(email);
    isValid ? setValidEmail(true) : setValidEmail(false);
  };

  const validatePhone = (phone) => {
    const isValid = validPhone.test(phone);
    isValid ? setValidPhone(true) : setValidPhone(false);
  };

  const submitInterestForm = (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    validateEmail(formElements.email.value);
    validatePhone(formElements.phone.value);
    if (isValidEmail && isValidPhone) {
      return postInterestForm(formElements);
    }
    // TODO: display the errors on the page?
    return;
  };
  return (
    <div className='page-wrapper'>
      <section className='interest-form_section'>
        <div className='page-padding'>
          <div className='container-small'>
            <Form onSubmit={submitInterestForm}>
              <Row className='justify-content-md-center'>
                <Col align='center' style={{ color: 'white' }}>
                  <div className='interest-form_heading'>Fill out the form below to launch.</div>
                </Col>
              </Row>
              <Row className='justify-content-md-center'>
                <Col className='p-1' sm={12} md={6}>
                  <input
                    id='first'
                    type='text'
                    className='w-100 transparent-text-input border border-dark rounded-pill px-3'
                    placeholder={'First Name*'}
                  />
                </Col>
                <Col className='p-1' sm={12} md={6}>
                  <input
                    id='last'
                    type='text'
                    className='transparent-text-input border border-dark rounded-pill px-3'
                    placeholder={'Last Name*'}
                  />
                </Col>
              </Row>
              <Row className='justify-content-md-center'>
                <Col className='p-1' sm={12} md={6}>
                  <input
                    id='email'
                    type='text'
                    className='transparent-text-input border border-dark rounded-pill px-3'
                    style={{
                      background: isValidEmail ? '#302B40' : 'red',
                    }}
                    placeholder={'Email*'}
                  />
                </Col>
                <Col className='p-1' sm={12} md={6}>
                  <input
                    id='phone'
                    type='text'
                    className='transparent-text-input border border-dark rounded-pill px-3'
                    style={{
                      background: isValidPhone ? '#302B40' : 'red',
                    }}
                    placeholder={'Phone Number*'}
                  />
                </Col>
              </Row>
              <Row className='justify-content-md-center'>
                <Col className='p-1'>
                  <input
                    id='beckettId'
                    type='text'
                    className='transparent-text-input border border-dark rounded-pill px-3'
                    placeholder={'Beckett ID'}
                  />
                </Col>
              </Row>
              <Row className='justify-content-md-center pt-1'>
                <Col align='left' className='checkbox-array rounded-custom p-3'>
                  <Form.Check type='checkbox' align='left'>
                    <Form.Check.Input type='checkbox' id='checkbox1' />
                    <Form.Check.Label>{`I have collectibles I’d like to securely store`}</Form.Check.Label>
                    <Form.Control.Feedback type='valid'></Form.Control.Feedback>
                  </Form.Check>

                  <Form.Check type='checkbox'>
                    <Form.Check.Input type='checkbox' id='checkbox2' />
                    <Form.Check.Label>{`I am just exploring storage options`}</Form.Check.Label>
                    <Form.Control.Feedback type='valid'></Form.Control.Feedback>
                  </Form.Check>

                  <Form.Check type='checkbox'>
                    <Form.Check.Input type='checkbox' id='checkbox3' />
                    <Form.Check.Label>{'I am interested in insuring my collectible(s)'}</Form.Check.Label>
                    <Form.Control.Feedback type='valid'></Form.Control.Feedback>
                  </Form.Check>

                  <Form.Check type='checkbox'>
                    <Form.Check.Input type='checkbox' id='checkbox4' />
                    <Form.Check.Label>
                      {'I would like to establish documented ownership of my collectible(s)'}
                    </Form.Check.Label>
                    <Form.Control.Feedback type='valid'></Form.Control.Feedback>
                  </Form.Check>

                  <Form.Check type='checkbox'>
                    <Form.Check.Input type='checkbox' id='checkbox5' />
                    <Form.Check.Label>
                      {'I am interested in instantly trading my collectible(s) with others'}
                    </Form.Check.Label>
                    <Form.Control.Feedback type='valid'></Form.Control.Feedback>
                  </Form.Check>

                  <Form.Check type='checkbox'>
                    <Form.Check.Input type='checkbox' id='checkbox6' />
                    <Form.Check.Label>{`I would like access to Beckett Vault's exclusive investors`}</Form.Check.Label>
                    <Form.Control.Feedback type='valid'></Form.Control.Feedback>
                  </Form.Check>
                </Col>
              </Row>
              <Row className='justify-content-md-center'>
                <Col align='center' className='col-md-5'>
                  <input type='submit' value='Get Early Access' className='border border-info rounded-pill fill-btn' />
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterestForm;
