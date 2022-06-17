import React from 'react'
import {Button} from 'react-bootstrap'
const SubmitButton = (props) => {
  const { func, title } = props;
  return (
    <Button onClick={() => func()}>{title}</Button>
  )
}

export default SubmitButton