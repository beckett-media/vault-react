import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const EditDetailsRow = ({ id, item }) => {
  const [tempItem, updateTempItem] = useState(item);
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
  const updateItemDetails = () => {};
  return (
    <Form>
      {Object.keys(tempItem).map((field) => {
        if (!notUserEditable(field)) {
          return (
            <Form.Group>
              <Form.Label>{field}</Form.Label>
              <Form.Control
                placeholder={`- ${field} -`}
                value={tempItem[field]}
                onChange={(e) => updateTempItem({ ...tempItem, [field]: e.target.value })}
              />
            </Form.Group>
          );
        }
      })}
    </Form>
  );
};

export default EditDetailsRow;
