import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const EditFields = ({ item }) => {
  const [tempItem, updateTempItem] = useState(item);
  return (
    <Form>
      {Object.keys(tempItem).map((field) => (
        <Form.Group>
          <Form.Label>{field}</Form.Label>
          <Form.Control
            placeholder={`- ${field} -`}
            value={tempItem[field]}
            onChange={(e) => updateTempItem({ ...tempItem, [field]: e.target.value })}
          />
        </Form.Group>
      ))}
    </Form>
  );
};

export default EditFields;
