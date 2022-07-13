import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import SubmitButton from './SubmitButton';
import { useNavigate } from 'react-router-dom';
import './ComingSoon.scss';

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
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title>Coming soon!</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <p>{`This feature isn't quite ready yet!`}</p>
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton func={dismiss} title='Return to My Collection' bg='dark' />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ComingSoon;
