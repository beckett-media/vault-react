import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Form, Image } from 'react-bootstrap';

import AdminRowExpanded from './AdminRowExpanded';
import LocationRow from './LocationRow';
import EditDetailsRow from './EditDetailsRow';
import EditImageRow from './EditImageRow';

import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import { useInventoryLocation } from '../../hooks/useInventoryLocation';
import { getSingleSubmission, updateSubmission } from '../../services/submission';

const AdminRow = ({ itemId, submission, expanded, setExpanded }) => {
  const [isEditing, setIsEditing] = useState('');
  const [locationSubmit, setLocationSubmit] = useState();
  const [idSubmit, setIdSubmit] = useState();
  const [detailsSubmit, setDetailsSubmit] = useState();
  const [imageSubmit, setImageSubmit] = useState();
  const [tempState, setTempState] = useState({});
  const [error, setError] = useState('');
  const [item, setItem] = useState({});

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    await getSingleSubmission(submission?.item_id)
      .then((res) => {
        setItem(res);
        setTempState(res);
      })
      .catch((err) => setError(err.message));
  };

  const { initialInventory, inventory, currentLocation, postLocation, updateInventory } = useInventoryLocation(itemId);

  // console.log(itemId);
  // console.log(initialInventory, inventory);
  // console.log(currentLocation);

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
    updateSubmission(submission.item_id, payload)
      .then((res) => {
        return;
      })
      .catch((err) => {
        setError(err.message);
      });
    return;
  };

  const updateDetails = () => {
    updateSubmission(submission.item_id, tempState)
      .then((res) => {
        return;
      })
      .catch((err) => {
        setError(err.message);
      });
    return;
  };

  return (
    <>
      <ListGroup.Item className='admin-page_table-row'>
        <Form.Check></Form.Check>
        <div className='d-flex gap-1 align-items-center'>
          <img className='img_thumbnail' src={item.image_url} />
          <PencilIcon
            onClick={() => {
              setIsEditing(adminRowSection.image);
              setExpanded(item.item_id);
            }}
          />
        </div>
        <div className='d-flex gap-1 align-items-center'>
          {item.item_id}
          <PencilIcon
            onClick={() => {
              setIsEditing(adminRowSection.id);
              setExpanded(item.item_id);
            }}
          />
        </div>
        <div className='d-flex gap-1 align-items-center'>
          1969 Topps #230 Tom Seaver Baseball BGS 9 $750
          <PencilIcon
            onClick={() => {
              setIsEditing(adminRowSection.details);
              setExpanded(item.item_id);
            }}
          />
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
      {!!isEditing && item.item_id === expanded && (
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
