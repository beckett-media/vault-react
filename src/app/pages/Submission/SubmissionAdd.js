import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ITEM_TYPE } from '../../services/items';
import './Submission.scss';

const AddBeckettItem = (props) => {
  return (
    <Form.Group className='md-5'>
      <Form.Label>Serial Number</Form.Label>
      <Form.Control type='text' placeholder='Enter Serial Number' />
    </Form.Group>
  );
};

const SubmissionAdd = ({ submitAddedItem }) => {
  const [type, setType] = useState(ITEM_TYPE.SPORTS_CARD);
  const [item, setItem] = useState({ type: ITEM_TYPE.SPORTS_CARD });

  const submitAddItemFormSubmit = (e) => {
    e.preventDefault();
    {
      Object.keys(item).length > 2 && submitAddedItem(item);
    }
    setItem({ type: ITEM_TYPE.SPORTS_CARD });
    setType(ITEM_TYPE.SPORTS_CARD);
    e.target.reset();
  };

  const updateItem = (tempItem) => setItem({ ...item, ...tempItem });

  const setEstVal = (value) => {
    const val = Number(value.replaceAll(',', ''));
    updateItem({
      estimatedValue: isNaN(val) ? item.estimatedValue : val,
    });
  };
  useEffect(() => setItem({ type }), [type]);
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
                      setType(e.target.value - 0);
                      setItem({ type: e.target.value - 0 });
                    }}
                  >
                    <option value='1'>Trading Card</option>
                    <option value='2'>Comic</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            {type === ITEM_TYPE.SPORTS_CARD ? (
              <>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Year*</Form.Label>
                      <Form.Control
                        type='number'
                        min={1900}
                        max={2050}
                        value={item.year || ''}
                        onChange={(e) => updateItem({ year: Number(e.target.value) })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Player*</Form.Label>
                      <Form.Control
                        type='text'
                        value={item.player || ''}
                        onChange={(e) => updateItem({ player: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Sport</Form.Label>
                      <Form.Control
                        type='text'
                        value={item.sport || ''}
                        onChange={(e) => updateItem({ sport: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Set name*</Form.Label>
                      <Form.Control
                        type='text'
                        value={item.setName || ''}
                        onChange={(e) => updateItem({ setName: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Card number*</Form.Label>
                      <Form.Control
                        type='text'
                        required
                        value={item.cardNumber || ''}
                        onChange={(e) => updateItem({ cardNumber: e.target.value.replace(/#/g, '') })}
                      />
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
                        <option value=''>- Select -</option>
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
                      <Form.Control
                        type='text'
                        value={item.grade || ''}
                        onChange={(e) => updateItem({ grade: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Serial number</Form.Label>
                      <Form.Control
                        type='text'
                        value={item.serialNumber || ''}
                        onChange={(e) => updateItem({ serialNumber: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label
                        className={item.estimatedValue && item.estimatedValue < 750 ? 'alert-est-val' : 'set-est-val'}
                      >
                        Declared value* (must be $750 or greater)
                      </Form.Label>
                      <Form.Control
                        value={(Number(item?.estimatedValue) && item?.estimatedValue?.toLocaleString()) || '0'}
                        onChange={(e) => setEstVal(e.target.value)}
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
                        value={item.year || ''}
                        onChange={(e) => updateItem({ year: Number(e.target.value) })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Title*</Form.Label>
                      <Form.Control
                        type='text'
                        value={item.title || ''}
                        onChange={(e) => updateItem({ title: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Issue #*</Form.Label>
                      <Form.Control
                        type='text'
                        required
                        value={item.issue || ''}
                        onChange={(e) => updateItem({ issue: e.target.value.replace(/#/g, '') })}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Publisher*</Form.Label>
                      <Form.Control
                        type='text'
                        value={item.publisher || ''}
                        onChange={(e) => updateItem({ publisher: e.target.value })}
                        required
                      />
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
                        <option value=''>- Select -</option>
                        <option value='cbcs'>CBCS</option>
                        <option value='cgc'>CGC</option>
                        <option value='other'>Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Grade</Form.Label>
                      <Form.Control
                        type='text'
                        value={item.grade || ''}
                        onChange={(e) => updateItem({ grade: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label>Serial number</Form.Label>
                      <Form.Control
                        value={item.serialNumber || ''}
                        type='text'
                        onChange={(e) => updateItem({ serialNumber: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group>
                      <Form.Label
                        className={item.estimatedValue && item.estimatedValue < 750 ? 'alert-est-val' : 'set-est-val'}
                      >
                        Declared value* (must be $750 or greater)
                      </Form.Label>
                      <Form.Control
                        value={(Number(item?.estimatedValue) && item?.estimatedValue?.toLocaleString()) || '0'}
                        onChange={(e) => setEstVal(e.target.value)}
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
            <Link to='/my-collection'>
              <Button bg='transparent' variant='outline-primary'>
                Cancel
              </Button>
            </Link>
            <Button type='reset' bg='transparent' variant='outline-primary' onClick={() => setItem({})}>
              Clear
            </Button>
            <Button type='submit' disabled={item.estimatedValue < 750}>
              Add
            </Button>
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
