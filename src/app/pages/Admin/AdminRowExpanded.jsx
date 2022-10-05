import React from 'react';
import { ListGroup, Button, Spinner } from 'react-bootstrap';

const AdminRowExpanded = ({ children, onCancel, onSave, isLoading }) => {
  return (
    <ListGroup.Item className='admin-page_expanded-row'>
      <div className='admin-page_expanded-row-content'>{children}</div>
      <div className='divider--grey'></div>
      <div className='admin-page_expanded-row-buttons'>
        <Button variant='outline-primary' onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={() => onSave()} disabled={isLoading}>
          {isLoading ? (
            <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          ) : (
            'Save & Exit'
          )}
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default AdminRowExpanded;
