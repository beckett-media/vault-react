import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const SubmissionConfirmModal = (props) => {
  const { show, setConfirm } = props;
  return (
    <Modal show={show} centered style={{ color: 'black' }}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure to submit?</p>
      </Modal.Body>
      <Button onClick={() => setConfirm()}>Confirm</Button>
    </Modal>
  );
};

export default SubmissionConfirmModal;
