import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row, Button } from 'react-bootstrap';

const AddBeckettItem = (props) => {
  return (
    <Form.Group className='md-5'>
      <Form.Label>Serial Number</Form.Label>
      <Form.Control type='text' placeholder='Enter Serial Number' />
    </Form.Group>
  );
};

const SubmissionAdd = ({ submitAddedItem }) => {
  const [item, setItem] = useState({});
  const submitAddItemFormSubmit = (e) => {
    e.preventDefault();
    submitAddedItem(item);
    setItem({});
    e.target.reset();
  };
  const updateItem = (tempItem) => setItem({ ...item, ...tempItem });

  return (
    <div className='w-100'>
      <div className='submission_heading'>Add Items to Vault</div>
      <Form onSubmit={submitAddItemFormSubmit} className='submission_form'>
        <Row className='submission_form-section'>
          <Col xs={12}>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Sport</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ title: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type='number'
                    min={1900}
                    max={2050}
                    onChange={(e) => updateItem({ year: Number(e.target.value) })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Setname</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ setname: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Player</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ player: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Card number</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ cardNumber: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Grading company</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ gradingCompany: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Grade</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ grade: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Serial number</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ serialNumber: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Declared value</Form.Label>
                  <Form.Control
                    type='number'
                    min={1}
                    onChange={(e) => updateItem({ declaredValue: Number(e.target.value) })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className='submission_divider'></div>
        <Row className='submission_form-section'>
          <div className='submission_form-button-wrapper'>
            <Button type='reset' bg='transparent' variant='outline-primary' onClick={() => setItem({})}>
              Cancel
            </Button>
            <Button type='submit'>Add</Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

// This is to enable becket serial number lookup.
AddBeckettItem.propTypes = {
  stateSetters: PropTypes.object,
};

SubmissionAdd.propTypes = {
  stateSetters: PropTypes.object,
  values: PropTypes.object,
  categorySelected: PropTypes.string,
  setCategorySelected: PropTypes.func,
};

export default SubmissionAdd;
