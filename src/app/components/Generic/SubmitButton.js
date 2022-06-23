import React from 'react';
import { Button } from 'react-bootstrap';
const SubmitButton = (props) => {
  const { id = '', func, title, bg='bg-primary' } = props;
  return (
    <Button 
      id={id} 
      onClick={func} 
      mx={1} 
      className={bg}
    >{title}</Button>
  );
};

export default SubmitButton;
