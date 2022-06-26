import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SubmitButton from '../Generic/SubmitButton';

const LeftNav = () => {
  const [open, toggle] = useState(false);
  const toggleNav = () => toggle(!open);
  return (
    <Col>
      <Row>
        {open && (
          <div>
            <div>LeftNav</div>
            <div>LeftNav</div>
            <div>LeftNav</div>
            <div>LeftNav</div>
          </div>
        )}
        <SubmitButton func={toggleNav} title=">" />
      </Row>
    </Col>
  );
};

export default LeftNav;
