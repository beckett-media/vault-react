import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { ITEM_TYPE } from '../../services/items';
import { toUpperCase } from '../../utils/strings';

const EditDetailsRow = ({ tempState, setTempState }) => {
  const updateTempState = (subState) => {
    setTempState({ ...tempState, ...subState });
  };

  return (
    <Form>
      <Row>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control
              type='text'
              disabled
              value={tempState.type === ITEM_TYPE.TRADING_CARD ? 'Trading Card' : 'Comic'}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ title: e.target.value })}
              value={tempState.title}
            />
          </Form.Group>
        </Col>

        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type='number'
              min={1900}
              max={2050}
              onChange={(e) => updateTempState({ year: Number(e.target.value) })}
              value={tempState.year}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          {tempState.type === ITEM_TYPE.TRADING_CARD ? (
            <Form.Group>
              <Form.Label>Player</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ player: e.target.value })}
                value={tempState.player}
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>Issue #</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ issue: e.target.value })}
                value={tempState.issue}
              />
            </Form.Group>
          )}
        </Col>

        <Col sm={12} lg={4}>
          {tempState.type === ITEM_TYPE.TRADING_CARD ? (
            <Form.Group>
              <Form.Label>Set name</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ set_name: e.target.value })}
                value={tempState.set_name}
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ publisher: e.target.value })}
                value={tempState.publisher}
              />
            </Form.Group>
          )}
        </Col>
        <Col sm={12} lg={4}>
          {tempState.type === ITEM_TYPE.TRADING_CARD ? (
            <Form.Group>
              <Form.Label>Sport</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ sport: e.target.value })}
                value={tempState.sport}
              />
            </Form.Group>
          ) : null}
        </Col>

        <Col sm={12}>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              onChange={(e) => updateTempState({ description: e.target.value })}
              value={tempState.description}
            />
          </Form.Group>
        </Col>

        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Overall grade</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ overall_grade: e.target.value })}
              value={tempState.overall_grade}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Sub grades</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ sub_grades: e.target.value })}
              value={tempState.sub_grades}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Grading Company</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ grading_company: toUpperCase(e.target.value) })}
              value={toUpperCase(tempState.grading_company)}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Estimated value</Form.Label>
            <Form.Control
              type='number'
              min={1}
              value={tempState.est_value}
              onChange={(e) => updateTempState({ est_value: Number(e.target.value) })}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ card_number: e.target.value })}
              value={tempState.card_number}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Serial Number</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ serial_number: e.target.value })}
              value={tempState.serial_number}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='admin-page_notes-edit-field'>
            <Form.Label>Notes:</Form.Label>
            <Form.Control
              value={tempState.notes}
              onChange={(e) => setTempState({ ...tempState, notes: e.target.value.substring(0, 255) })}
              as='textarea'
              rows={3}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default EditDetailsRow;
