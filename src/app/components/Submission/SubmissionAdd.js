import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
  };
  const updateItem = (tempItem) => setItem({ ...item, ...tempItem });

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>Add Item</h1>
      </Row>
      <Form onSubmit={submitAddItemFormSubmit}>
        <Row className='m-2'>
          <Col xs={12}>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Grading Company</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) =>
                      updateItem({ gradingCompany: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) =>
                      updateItem({ serialNumber: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                onChange={(e) => updateItem({ description: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mx-4 my-2'>
          <Col xs={2}>
            <Button type='submit' size='lg'>
              Add
            </Button>
          </Col>
        </Row>
        <Row className='mx-4 my-2'>
          <Col xs={2}>
            <Button type='reset' bg='transparent' onClick={() => setItem({})}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
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
