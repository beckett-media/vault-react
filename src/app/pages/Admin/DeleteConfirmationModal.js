import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { deleteSubmission } from '../../services/submission';
import { ITEM_OR_ORDER } from './const';

const DeleteConfirmationModal = ({
  itemOrOrder,
  confirmDelete,
  id,
  item_id,
  setConfirmDelete,
  deleteOrder,
  setFilterBy,
}) => {
  const deleteFunction = itemOrOrder === ITEM_OR_ORDER.ITEM ? deleteSubmission : deleteOrder;
  return (
    <Modal className='admin-row_delete-confirm-modal' show={confirmDelete}>
      <ModalHeader>
        <h3>
          Delete {itemOrOrder === ITEM_OR_ORDER.ITEM ? 'item' : 'order '} {item_id}
        </h3>
      </ModalHeader>
      <ModalBody>
        Are you sure you'd like to delete {itemOrOrder === ITEM_OR_ORDER.ITEM ? 'item' : 'all items in order '}{' '}
        {item_id}?
      </ModalBody>
      <ModalFooter>
        <Button variant='link' onClick={() => setConfirmDelete(false)}>
          Cancel
        </Button>
        <Button
          className='btn-primary'
          onClick={() => {
            deleteFunction(id);
            setFilterBy('deleted');
            setConfirmDelete(false);
          }}
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;
