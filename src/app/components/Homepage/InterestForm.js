import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { interestFormSelector } from '../../state/selectors';
import {
  setFirst,
  setLast,
  setPhone,
  setEmail,
  setBeckettId,
  setCheckbox1,
  setCheckbox2,
  setCheckbox3,
  setCheckbox4,
  setCheckbox5,
  setCheckbox6,
} from '../../state/actions';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { validEmail, validPhone } from '../Validation/regex';

const InterestForm = (props) => {
  const interestForm = useSelector(interestFormSelector);
  const dispatch = useDispatch();

  const [tempText, updateTempText] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [lastField, setLastField] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

  const onFieldChange = (e) => {
    if (lastField === '') {
      setLastField(e.target.id);
    }
    setCurrentField(e.target.id);
    if (e.target.id.substr(0, 8) === 'checkbox') {
      switch (e.target.id) {
        case 'checkbox1':
          dispatch(
            setCheckbox1({
              type: 'SET_CHECKBOX_1',
              interestForm: {
                checkbox1: !interestForm.checkbox1,
              },
            }),
          );
          break;
        case 'checkbox2':
          dispatch(
            setCheckbox2({
              type: 'SET_CHECKBOX_2',
              interestForm: {
                checkbox2: !interestForm.checkbox1,
              },
            }),
          );
          break;
        case 'checkbox3':
          dispatch(
            setCheckbox3({
              type: 'SET_CHECKBOX_3',
              interestForm: {
                checkbox3: !interestForm.checkbox3,
              },
            }),
          );
          break;
        case 'checkbox4':
          dispatch(
            setCheckbox4({
              type: 'SET_CHECKBOX_4',
              interestForm: {
                checkbox4: !interestForm.checkbox4,
              },
            }),
          );
          break;
        case 'checkbox5':
          dispatch(
            setCheckbox5({
              type: 'SET_CHECKBOX_5',
              interestForm: {
                checkbox5: !interestForm.checkbox5,
              },
            }),
          );
          break;
        case 'checkbox6':
          dispatch(
            setCheckbox6({
              type: 'SET_CHECKBOX_6',
              interestForm: {
                checkbox6: !interestForm.checkbox6,
              },
            }),
          );
          break;
      }
    }
    if (e.target.id !== currentField) {
      console.log('ran');
      switch (lastField) {
        case 'first':
          dispatch(
            setFirst({
              type: 'SET_FIRST',
              interestForm: { first: tempText },
            }),
          );
          break;
        case 'last':
          dispatch(
            setLast({
              type: 'SET_LAST',
              interestForm: { last: tempText },
            }),
          );
          break;
        case 'phone':
          dispatch(
            setPhone({
              type: 'SET_PHONE',
              interestForm: { phone: tempText },
            }),
          );
          break;
        case 'email':
          dispatch(
            setEmail({
              type: 'SET_EMAIL',
              interestForm: { email: tempText },
            }),
          );
          break;
        case 'beckettId':
          dispatch(
            setBeckettId({
              type: 'SET_BECKETT_ID',
              interestForm: { beckettId: tempText },
            }),
          );
          break;
      }
    }
    if (e.target.id.substr(0, 8) !== 'checkbox') {
      updateTempText(interestForm[e.target.id]);
    }
    setLastField(e.target.id);
  };
  const validateEmail = (email) => {
    updateTempText(email);
    const isValid = validEmail.test(email);
    isValid ? setInvalidEmail(false) : setInvalidEmail(true);
  };
  const validatePhone = (phone) => {
    updateTempText(phone);
    const isValid = validPhone.test(phone);
    isValid ? setInvalidPhone(false) : setInvalidPhone(true);
  };
  return (
    <Container fluid>
      <Form>
        <Row className='justify-content-md-center'>
          <Col align='center' style={{ color: 'white' }}>
            Fill out the form below to launch. {interestForm.first}
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col className='col-md-5 p-1'>
            <input
              id='first'
              type='text'
              value={currentField === 'first' ? tempText : interestForm.first}
              className='transparent-text-input border border-dark rounded-pill px-3'
              placeholder={'First Name*'}
              onSelect={(e) => e.target.id !== currentField && onFieldChange(e)}
              onChange={(e) => updateTempText(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col className='col-md-5 p-1'>
            <input
              id='last'
              type='text'
              value={currentField === 'last' ? tempText : interestForm.last}
              className='transparent-text-input border border-dark rounded-pill px-3'
              placeholder={'Last Name*'}
              onSelect={(e) => e.target.id !== currentField && onFieldChange(e)}
              onChange={(e) => updateTempText(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col className='col-md-5 p-1'>
            <input
              id='email'
              type='text'
              value={currentField === 'email' ? tempText : interestForm.email}
              className='transparent-text-input border border-dark rounded-pill px-3'
              style={{
                background: invalidEmail ? 'red' : 'rgb(58, 43, 77)',
              }}
              placeholder={'Email*'}
              onSelect={(e) => e.target.id !== currentField && onFieldChange(e)}
              onChange={(e) => validateEmail(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col className='col-md-5 p-1'>
            <input
              id='phone'
              type='text'
              value={currentField === 'phone' ? tempText : interestForm.phone}
              className='transparent-text-input border border-dark rounded-pill px-3'
              style={{
                background: invalidPhone ? 'red' : 'rgb(58, 43, 77)',
              }}
              placeholder={'Phone Number*'}
              onSelect={(e) => e.target.id !== currentField && onFieldChange(e)}
              onChange={(e) => validatePhone(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col className='col-md-5 p-1'>
            <input
              id='beckettId'
              type='text'
              value={
                currentField === 'beckettId' ? tempText : interestForm.beckettId
              }
              className='transparent-text-input border border-dark rounded-pill px-3'
              placeholder={'Beckett ID'}
              onSelect={(e) => e.target.id !== currentField && onFieldChange(e)}
              onChange={(e) => updateTempText(e.target.value)}
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center pt-1'>
          <Col
            align='left'
            className='checkbox-array rounded-custom col-md-5 p-3'
          >
            <Form.Check type='checkbox' align='left'>
              <Form.Check.Input
                type='checkbox'
                id='checkbox1'
                onChange={(e) => onFieldChange(e)}
              />
              <Form.Check.Label>{`I have collectibles I’d like to securely store`}</Form.Check.Label>
              <Form.Control.Feedback type='valid'></Form.Control.Feedback>
            </Form.Check>

            <Form.Check type='checkbox'>
              <Form.Check.Input
                type='checkbox'
                id='checkbox2'
                onChange={(e) => onFieldChange(e)}
              />
              <Form.Check.Label>{`I am just exploring storage options`}</Form.Check.Label>
              <Form.Control.Feedback type='valid'></Form.Control.Feedback>
            </Form.Check>

            <Form.Check type='checkbox'>
              <Form.Check.Input
                type='checkbox'
                id='checkbox3'
                onChange={(e) => onFieldChange(e)}
              />
              <Form.Check.Label>
                {'I am interested in insuring my collectible(s)'}
              </Form.Check.Label>
              <Form.Control.Feedback type='valid'></Form.Control.Feedback>
            </Form.Check>

            <Form.Check type='checkbox'>
              <Form.Check.Input
                type='checkbox'
                id='checkbox4'
                onChange={(e) => onFieldChange(e)}
              />
              <Form.Check.Label>
                {
                  'I would like to establish documented ownership of my collectible(s)'
                }
              </Form.Check.Label>
              <Form.Control.Feedback type='valid'></Form.Control.Feedback>
            </Form.Check>

            <Form.Check type='checkbox'>
              <Form.Check.Input
                type='checkbox'
                id='checkbox5'
                onChange={(e) => onFieldChange(e)}
              />
              <Form.Check.Label>
                {
                  'I am interested in instantly trading my collectible(s) with others'
                }
              </Form.Check.Label>
              <Form.Control.Feedback type='valid'></Form.Control.Feedback>
            </Form.Check>

            <Form.Check type='checkbox'>
              <Form.Check.Input
                type='checkbox'
                id='checkbox6'
                onChange={(e) => onFieldChange(e)}
              />
              <Form.Check.Label>
                {"I would like access to Beckett Vault's exclusive investors"}
              </Form.Check.Label>
              <Form.Control.Feedback type='valid'></Form.Control.Feedback>
            </Form.Check>
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col align='center' className='col-md-5'>
            {/* onMouseover is used to fireoff event to update 
                                text in redux before submission */}
            <input
              type='button'
              value='Get Early Access'
              className='border border-info rounded-pill fill-btn'
              onMouseOver={(e) => onFieldChange(e)}
              onClick={() => props.formSubmission(interestForm)}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default InterestForm;
