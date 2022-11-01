import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { deleteOrder, deleteSubmission } from '../../services/submission';

const DeleteConfirmationModal = ({ confirmDelete, itemId, setConfirmDelete }) => {
  const deleteFunction = Array.isArray(itemId) ? deleteOrder : deleteSubmission;
  return (
    <Modal className='admin-row_delete-confirm-modal' show={confirmDelete}>
      <ModalHeader>
        <h3>Delete item {itemId}</h3>
      </ModalHeader>
      <ModalBody>Are you sure you'd like to delete item {itemId}?</ModalBody>
      <ModalFooter>
        <Button variant='link' onClick={() => setConfirmDelete(false)}>
          Cancel
        </Button>
        <Button className='btn-primary' onClick={() => deleteFunction(itemId)}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;
