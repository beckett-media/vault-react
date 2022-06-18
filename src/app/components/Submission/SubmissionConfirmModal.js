import React from 'react';
import { Button, CloseButton, Modal } from 'react-bootstrap';
import SubmitButton from '../Generic/SubmitButton';

const SubmissionConfirmModal = props => {
  const { show, setConfirm, onHide } = props;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <p>TEST Modal</p>
      <Button onClick={() => setConfirm(true)}>Button</Button>
    </Modal>
  );
};

export default SubmissionConfirmModal;
