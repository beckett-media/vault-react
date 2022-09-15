import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

import AdminRowExpanded from './AdminRowExpanded';
import LocationRow from './LocationRow';
import EditDetailsRow from './EditDetailsRow';

import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import EditImageRow from './EditImageRow';

const AdminRow = () => {
  const [isEditing, setIsEditing] = useState('');
  const [locationSubmit, setLocationSubmit] = useState();
  const [idSubmit, setIdSubmit] = useState();
  const [imageSubmit, setImageSubmit] = useState();
  const [detailsSubmit, setDetailsSubmit] = useState();

  const adminRowSection = {
    location: 'location',
    id: 'id',
    details: 'details',
    image: 'image',
  };

  const returnSaveFunction = (editSection) => {
    console.log(editSection);
    switch (editSection) {
      case editSection === adminRowSection.location:
        locationSubmit();
      case editSection === adminRowSection.id:
        console.log('id');
      case editSection === adminRowSection.image:
        console.log('image');
      case editSection === adminRowSection.details:
        console.log('details');
    }
  };

  return (
    <>
      <ListGroup.Item className='admin-page_table-row'>
        <Form.Check></Form.Check>
        <div className='d-flex gap-1 align-items-center'>
          <span>img</span>
          <PencilIcon onClick={() => setIsEditing(adminRowSection.image)} />
        </div>
        <div className='d-flex gap-1 align-items-center'>
          0123456789
          <PencilIcon onClick={() => setIsEditing(adminRowSection.id)} />
        </div>
        <div className='d-flex gap-1 align-items-center'>
          1969 Topps #230 Tom Seaver Baseball BGS 9 $750
          <PencilIcon onClick={() => setIsEditing(adminRowSection.details)} />
        </div>
        <div>
          <Form.Select>
            <option value=''>Status</option>
          </Form.Select>
        </div>
        <div className='d-flex gap-1 align-items-center'>
          Unassigned
          <PencilIcon onClick={() => setIsEditing(adminRowSection.location)} />
        </div>
        <div>
          <Button className='w-100'>Assign</Button>
        </div>
      </ListGroup.Item>
      {!!isEditing && (
        <AdminRowExpanded
          onCancel={() => setIsEditing('')}
          onSave={() => returnSaveFunction(isEditing)}
          className='text-body'
        >
          {isEditing === adminRowSection.location && <LocationRow returnLocationSubmit={setLocationSubmit} />}
          {isEditing === adminRowSection.id && <>Edit ID</>}
          {isEditing === adminRowSection.details && (
            <EditDetailsRow returnDetailsSubmit={setDetailsSubmit} item={{ fieldA: 'A', field2: '2' }} />
          )}
          {isEditing === adminRowSection.image && <EditImageRow img={''} imgRev={''} />}
        </AdminRowExpanded>
      )}
    </>
  );
};

export default AdminRow;
