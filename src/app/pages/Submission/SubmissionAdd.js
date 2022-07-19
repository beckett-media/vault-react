import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ImageUploader from '../../components/Generic/ImageUploader';

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
    if (!item.imageBase64 || !item.imageFormat) {
      alert('image is empty');
      return;
    }
    submitAddedItem(item);
    setItem({});
    e.target.reset();
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
              <ImageUploader
                onFileChange={(obj) => {
                  if (obj) {
                    updateItem(obj);
                  } else {
                    updateItem({
                      imageFormat: null,
                      imageBase64: null,
                    });
                  }
                }}
              />
            </Row>
            <Row>
              <Col sm={12} lg={4}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ title: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={4}>
                <Form.Group>
                  <Form.Label>Genre</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ genre: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={4}>
                <Form.Group>
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ manufacturer: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as='textarea' onChange={(e) => updateItem({ description: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={12} lg={3}>
                <Form.Group>
                  <Form.Label>Grading Company</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ gradingCompany: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={3}>
                <Form.Group>
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ serialNumber: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={3}>
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
              <Col sm={12} lg={3}>
                <Form.Group>
                  <Form.Label>Estimated value</Form.Label>
                  <Form.Control
                    type='number'
                    min={1}
                    onChange={(e) => updateItem({ estimatedValue: Number(e.target.value) })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={12} lg={3}>
                <Form.Group>
                  <Form.Label>Overall grade</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ overallGrade: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={3}>
                <Form.Group>
                  <Form.Label>Sub grades</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ subGrades: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={3}>
                <Form.Group>
                  <Form.Label>Auto graph</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ autoGraph: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={12} lg={3}>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type='text' onChange={(e) => updateItem({ subject: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
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
