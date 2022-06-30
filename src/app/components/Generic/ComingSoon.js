import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import SubmitButton from './SubmitButton';
import { useNavigate } from 'react-router-dom';

const ComingSoon = (props) => {
  const { open, setOpen } = props;
  const dismiss = () => {
    setOpen(false);
    navigate('/gallery');
  };
  const navigate = useNavigate();
  return (
    <>
      <Modal show={open} onHide={dismiss}>
        <Modal.Header closeButton className='bg-dark'>
          <Modal.Title>Coming soon!</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>
          <p>This feature isn't quite ready yet!</p>
        </Modal.Body>
        <SubmitButton func={dismiss} title='Close' bg='black' />
      </Modal>
    </>
  );
};

export default ComingSoon;
