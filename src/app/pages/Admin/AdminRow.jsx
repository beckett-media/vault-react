import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

import AdminRowExpanded from './AdminRowExpanded';
import InventoryLocationForm from '../../components/InventoryLocationForm/InventoryLocationForm';

import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';

const AdminRow = () => {
  const [isEditing, setIsEditing] = useState('');

  return (
    <>
      <ListGroup.Item className='admin-page_table-row'>
        <Form.Check></Form.Check>
        <div className='d-flex gap-1 align-items-center'>
          <span>img</span>
          <PencilIcon onClick={() => setIsEditing('image')} />
        </div>
        <div className='d-flex gap-1 align-items-center'>
          0123456789
          <PencilIcon onClick={() => setIsEditing('id')} />
        </div>
        <div className='d-flex gap-1 align-items-center'>
          1969 Topps #230 Tom Seaver Baseball BGS 9 $750
          <PencilIcon onClick={() => setIsEditing('details')} />
        </div>
        <div>
          <Form.Select>
            <option value=''>Status</option>
          </Form.Select>
        </div>
        <div className='d-flex gap-1 align-items-center'>
          Unassigned
          <PencilIcon onClick={() => setIsEditing('location')} />
        </div>
        <div>
          <Button className='w-100'>Assign</Button>
        </div>
      </ListGroup.Item>
      {!!isEditing && (
        <AdminRowExpanded onCancel={() => setIsEditing('')} className='text-body'>
          {isEditing === 'location' && <InventoryLocationForm />}
          {isEditing === 'id' && <>Edit ID</>}
          {isEditing === 'details' && <>Edit details</>}
          {isEditing === 'image' && <>Edit image</>}
        </AdminRowExpanded>
      )}
    </>
  );
};

export default AdminRow;
