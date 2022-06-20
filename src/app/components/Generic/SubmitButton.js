import React from 'react';
<<<<<<< HEAD
import {Button} from 'react-bootstrap';
const SubmitButton = (props) => {
  const { func, title } = props;
  return (
    <Button onClick={func} mx={1}>{title}</Button>
=======
import { Button } from 'react-bootstrap';
const SubmitButton = (props) => {
  const { func, title } = props;
  return (
    <Button onClick={func} mx={1}>
      {title}
    </Button>
>>>>>>> b44466650e6c13429f8694594a36dffb4256765d
  );
};

export default SubmitButton;
