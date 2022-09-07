import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Submission.scss';

const SubmissionConfirmModal = (props) => {
  const { open, onConfirm, onClose, isLoading } = props;

  return (
    <Modal className='text-body' show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`Are you sure you'd like to submit?`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Once submitted, your items will be staged for vaulting.</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='primary' onClick={onConfirm} disabled={isLoading}>
          Confirm submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmissionConfirmModal;
