import React from 'react';
import { Button } from 'react-bootstrap';
const SubmitButton = props => {
  const { func, title } = props;
  return (
    <Button onClick={func} mx={1}>
      {title}
    </Button>
  );
};

export default SubmitButton;
