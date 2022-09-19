import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const EditDetailsRow = ({ tempState, setTempState }) => {
  const notUserEditable = (field) => {
    return (
      field.indexOf('_id') !== -1 ||
      field.indexOf('_at') !== -1 ||
      field.indexOf('_url') !== -1 ||
      field.indexOf('_desc') !== -1 ||
      field === 'item_uuid' ||
      field === 'user' ||
      field === 'id'
    );
  };
  return (
    <Form>
      {Object.keys(tempState).map((field) => {
        const fieldSplit = field.split('_').join(' ');
        const fieldName = String(fieldSplit[0].toUpperCase()) + fieldSplit.slice(1);
        if (!notUserEditable(field)) {
          return (
            <Form.Group>
              <Form.Label>{fieldName}</Form.Label>
              <Form.Control
                placeholder={`- ${fieldName} -`}
                value={tempState[field]}
                onChange={(e) => setTempState({ ...tempState, [field]: e.target.value })}
              />
            </Form.Group>
          );
        }
      })}
    </Form>
  );
};

export default EditDetailsRow;
