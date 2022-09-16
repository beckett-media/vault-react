import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

import AdminRowExpanded from './AdminRowExpanded';
import LocationRow from './LocationRow';
import EditDetailsRow from './EditDetailsRow';

import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import { useInventoryLocation } from '../../hooks/useInventoryLocation';

const AdminRow = ({ itemId }) => {
  const [isEditing, setIsEditing] = useState('');
  const [locationSubmit, setLocationSubmit] = useState();
  const [idSubmit, setIdSubmit] = useState();
  const [imageSubmit, setImageSubmit] = useState();
  const [detailsSubmit, setDetailsSubmit] = useState();

  const { initialInventory, inventory, currentLocation, postLocation, updateInventory } = useInventoryLocation(itemId);

  console.log(itemId);
  console.log(initialInventory, inventory);
  console.log(currentLocation);

  const returnLocationLabel = (locationObject) => {
    const { row, shelf, box, slot, vault, zone } = locationObject;

    const abbreviatedVault = vault === 'dallas' ? 'DAL' : 'DEL';

    let abbreviatedZone;

    if (zone.includes('cabinet')) {
      abbreviatedZone = 'CAB' + zone.at(-1);
    }
    if (zone.includes('credenza')) {
      abbreviatedZone = 'CRED';
    }
    if (zone.includes('gallery')) {
      abbreviatedZone = 'GALLERY';
    }
    if (zone.includes('main')) {
      abbreviatedZone = 'MAIN';
    }

    return `${abbreviatedVault}-${abbreviatedZone}-${shelf || ''}-${row || ''}-${box || ''}-${slot || ''}`;
  };

  const adminRowSection = {
    location: 'location',
    id: 'id',
    details: 'details',
    image: 'image',
  };

  const returnSaveFunction = (editSection) => {
    console.log(editSection);
    switch (editSection) {
      case adminRowSection.location:
        console.log('running post');
        postLocation();
      case adminRowSection.id:
        console.log('id');
      case adminRowSection.image:
        console.log('image');
      case adminRowSection.details:
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
          {currentLocation ? returnLocationLabel(currentLocation) : 'Unassigned'}
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
          {isEditing === adminRowSection.location && (
            <LocationRow updateInventory={updateInventory} inventory={inventory} />
          )}
          {isEditing === adminRowSection.id && <>Edit ID</>}
          {isEditing === adminRowSection.details && (
            <EditDetailsRow returnDetailsSubmit={setDetailsSubmit} item={{ fieldA: 'A', field2: '2' }} />
          )}
          {isEditing === adminRowSection.image && <>Edit image</>}
        </AdminRowExpanded>
      )}
    </>
  );
};

export default AdminRow;
