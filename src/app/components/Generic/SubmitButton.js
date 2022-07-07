import React from 'react';
import { Button } from 'react-bootstrap';
const SubmitButton = (props) => {
  const { id = '', func, title, bg = 'primary', size = 'sm' } = props;
  return (
    <Button
      id={id}
      className='bg'
      onClick={func}
      mx={1}
      size={size}
      variant={bg}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
