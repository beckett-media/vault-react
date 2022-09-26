import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const EditDetailsRow = ({ tempState, setTempState }) => {
  const notUserEditable = (field) => {
    return (
      field.indexOf('_id') !== -1 ||
      field.indexOf('_at') !== -1 ||
      field.indexOf('_url') !== -1 ||
      field.indexOf('_desc') !== -1 ||
      field === 'item_uuid' ||
      field === 'user' ||
      field === 'id' ||
      field === 'status' ||
      field === 'type'
    );
  };
  return (
    <Form>
      <Row>
        {Object.keys(tempState).map((field) => {
          const fieldSplit = field.split('_').join(' ');
          const fieldName = String(fieldSplit[0].toUpperCase()) + fieldSplit.slice(1);
          if (!notUserEditable(field)) {
            return (
              <Col className='col-md-4' key={field}>
                <Form.Group>
                  <Form.Label>{fieldName}</Form.Label>
                  <Form.Control
                    placeholder={`- ${fieldName} -`}
                    value={tempState[field]}
                    onChange={(e) => setTempState({ ...tempState, [field]: e.target.value })}
                  />
                </Form.Group>
              </Col>
            );
          }
        })}
      </Row>
    </Form>
  );
};

export default EditDetailsRow;
