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
  const [type, setType] = useState(1);
  const [item, setItem] = useState({ type: 1, gradingCompany: 'bgs' });

  const submitAddItemFormSubmit = (e) => {
    e.preventDefault();
    {
      Object.keys(item).length > 2 && submitAddedItem(item);
    }
    setItem({ type: 1, gradingCompany: 'bgs' });
    setType(1);
    e.target.reset();
  };
  const updateItem = (tempItem) => setItem({ ...item, ...tempItem });

  return (
    <div className='w-100'>
      <div className='submission_heading'>Submit Items to Vault</div>
      <Form onSubmit={submitAddItemFormSubmit} className='submission_form'>
        <Row className='submission_form-section'>
          <Col xs={12}>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      console.log(e.target.value - 0);
                      setItem({});
                      setType(e.target.value - 0);
                      updateItem({ type: e.target.value - 0 });
                    }}
                  >
                    <option value='1'>Trading Card</option>
                    <option value='2'>Comic</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            {type === 1 ? (
              <>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Year*</Form.Label>
                      <Form.Control
                        type='number'
                        min={1900}
                        max={2050}
                        onChange={(e) => updateItem({ year: Number(e.target.value) })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Player*</Form.Label>
                      <Form.Control type='text' onChange={(e) => updateItem({ player: e.target.value })} required />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Sport</Form.Label>
                      <Form.Control type='text' onChange={(e) => updateItem({ sport: e.target.value })} />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Set name*</Form.Label>
                      <Form.Control type='text' onChange={(e) => updateItem({ setName: e.target.value })} required />
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
                      <Form.Select
                        onChange={(e) => {
                          updateItem({ gradingCompany: e.target.value });
                        }}
                      >
                        <option value='bgs'>BGS</option>
                        <option value='psa'>PSA</option>
                        <option value='sgc'>SGC</option>
                        <option value='other'>Other</option>
                      </Form.Select>
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
                      <Form.Label>Declared value* (must be $750 or greater)</Form.Label>
                      <Form.Control
                        type='number'
                        min={750}
                        onChange={(e) => updateItem({ estimatedValue: Number(e.target.value) })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Year*</Form.Label>
                      <Form.Control
                        type='number'
                        min={1900}
                        max={2050}
                        onChange={(e) => updateItem({ year: Number(e.target.value) })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Title*</Form.Label>
                      <Form.Control type='text' onChange={(e) => updateItem({ title: e.target.value })} required />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Issue #</Form.Label>
                      <Form.Control type='text' onChange={(e) => updateItem({ issue: e.target.value })} />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Publisher*</Form.Label>
                      <Form.Control type='text' onChange={(e) => updateItem({ publisher: e.target.value })} required />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Grading company</Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          updateItem({ gradingCompany: e.target.value });
                        }}
                      >
                        <option value='cbcs'>CBCS</option>
                        <option value='cgc'>CGC</option>
                        <option value='other'>Other</option>
                      </Form.Select>
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
                      <Form.Label>Declared value* (must be $750 or greater)</Form.Label>
                      <Form.Control
                        type='number'
                        min={750}
                        onChange={(e) => updateItem({ estimatedValue: Number(e.target.value) })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
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
