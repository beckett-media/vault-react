import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Form, Image } from 'react-bootstrap';

import AdminRowExpanded from './AdminRowExpanded';
import LocationRow from './LocationRow';
import EditDetailsRow from './EditDetailsRow';
import EditImageRow from './EditImageRow';

import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import { useInventoryLocation } from '../../hooks/useInventoryLocation';
import { getSingleSubmission, updateSubmission } from '../../services/submission';
import { SUBMISSION_STATUS } from '../../services/submission';

const AdminRow = ({ item }) => {
  const [isEditing, setIsEditing] = useState('');
  const [tempState, setTempState] = useState({});
  const [error, setError] = useState('');

  const { initialInventory, inventory, currentLocation, postLocation, updateInventory } = useInventoryLocation(
    item.item_id,
  );

  const returnLocationLabel = (locationObject) => {
    if (!locationObject) return 'Unassigned';

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
    switch (editSection) {
      case adminRowSection.location:
        postLocation();
        break;
      case adminRowSection.id:
        console.log('id');
        break;
      case adminRowSection.image:
        updateImage();
        break;
      case adminRowSection.details:
        updateDetails();
        break;
    }
  };

  const updateImage = (itemVal = '') => {
    const payload = {};
    if (itemVal === 'del-image_url' || itemVal === 'del-image_rev_url') {
      payload[itemVal.substring(4)] = '';
    } else {
      if (tempState.image_url !== item.img_url) {
        payload.image_url = tempState.image_url;
      }
      if (tempState.image_rev_url !== item.image_rev_url) {
        payload.image_rev_url = tempState.image_rev_url;
      }
    }
    updateSubmission(item.item_id, payload)
      .then((res) => {
        return;
      })
      .catch((err) => {
        setError(err.message);
      });
    return;
  };

  const updateDetails = () => {
    const payload = {};
    Object.keys(tempState).map((itm) => {
      if (tempState[itm] !== item[itm]) {
        payload[itm] = tempState[itm];
      }
    });
    updateSubmission(item.item_id, payload)
      .then((res) => {
        return;
      })
      .catch((err) => {
        setError(err.message);
      });
    return;
  };

  const isStatusPending = item.status === SUBMISSION_STATUS.Submitted;

  return (
    <>
      <ListGroup.Item className='admin-page_table-row'>
        <div>{!isStatusPending && <Form.Check></Form.Check>}</div>
        <div className='d-flex gap-1 align-items-center'>
          <img className='img_thumbnail' src={item.image_url} />
          {!isStatusPending && (
            <PencilIcon
              onClick={() => {
                setIsEditing(adminRowSection.image);
              }}
            />
          )}
        </div>
        <div className='d-flex gap-1 align-items-center'>
          {item.item_id}
          {!isStatusPending && (
            <PencilIcon
              onClick={() => {
                setIsEditing(adminRowSection.id);
              }}
            />
          )}
        </div>
        <div className='d-flex gap-1 align-items-center'>
          1969 Topps #230 Tom Seaver Baseball BGS 9 $750
          {!isStatusPending && (
            <PencilIcon
              onClick={() => {
                setTempState(item);
                setIsEditing(adminRowSection.details);
              }}
            />
          )}
        </div>
        <div>
          <Form.Select aria-label='Status select dropdown'>
            <option>{item.status_desc}</option>
          </Form.Select>
        </div>
        <div className='d-flex gap-1 align-items-center'>
          {returnLocationLabel(currentLocation)}
          {!isStatusPending && <PencilIcon onClick={() => setIsEditing(adminRowSection.location)} />}
        </div>
        <div>
          <Button className='w-100' disabled={isStatusPending}>
            Assign
          </Button>
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
            <EditDetailsRow tempState={tempState} setTempState={setTempState} />
          )}
          {isEditing === adminRowSection.image && (
            <EditImageRow
              tempState={tempState}
              item={item}
              error={error}
              setTempState={setTempState}
              updateImage={updateImage}
            />
          )}
        </AdminRowExpanded>
      )}
    </>
  );
};

export default AdminRow;
