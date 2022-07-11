import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddBeckettItem = (props) => {
  return (
    <Form.Group className='md-5'>
      <Form.Label>Serial Number</Form.Label>
      <Form.Control type='text' placeholder='Enter Serial Number' />
    </Form.Group>
  );
};

const AddOtherItem = (props) => {
  const {
    gradingCompany,
    category,
    serialNumber,
    description,
    title,
    genre,
  } = props.values;

  return (
    <Form>
      <Row>
        <Col sm={12} lg={6}>
          <Form.Group>
            <Form.Label>Grading Company</Form.Label>
            <Form.Control
              type='text'
              value={gradingCompany}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={6}>
          <Form.Group>
            <Form.Label>Serial Number</Form.Label>
            <Form.Control
              type='text'
              value={serialNumber}
            />
          </Form.Group>
        </Col>
      </Row>
      {!props.categorySelected && (
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            value={description}
          />
        </Form.Group>
      )}
    </Form>
  );
};

const SubmissionAdd = (props) => {
  const gradingCompany = props.values.gradingCompany;
  const [gradingCompanySelected, setGradingCompanySelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const onChange = (evt) => {
    setGradingCompanySelected(true);
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>Add Item</h1>
      </Row>
      <AddOtherItem
        stateSetters={props.stateSetters}
        values={props.values}
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
      />
    </Container>
  );
};
// This is to enable becket serial number lookup.
AddBeckettItem.propTypes = {
  stateSetters: PropTypes.object,
};

AddOtherItem.propTypes = {
  stateSetters: PropTypes.object,
  values: PropTypes.object,
  categorySelected: PropTypes.string,
  setCategorySelected: PropTypes.func,
};
SubmissionAdd.propTypes = {
  stateSetters: PropTypes.object,
  values: PropTypes.object,
  categorySelected: PropTypes.string,
  setCategorySelected: PropTypes.func,
};

export default SubmissionAdd;
