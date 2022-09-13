import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const AdminRowExpanded = ({ children, onCancel }) => {
  return (
    <ListGroup.Item className='admin-page_expanded-row'>
      <div className='admin-page_expanded-row-content'>{children}</div>
      <div className='divider--grey'></div>
      <div className='admin-page_expanded-row-buttons'>
        <Button variant='outline-primary' onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button>Save & Exit</Button>
      </div>
    </ListGroup.Item>
  );
};

export default AdminRowExpanded;
