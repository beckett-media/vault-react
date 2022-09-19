import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Form, Image } from 'react-bootstrap';

import AdminRowExpanded from './AdminRowExpanded';
import LocationRow from './LocationRow';
import EditDetailsRow from './EditDetailsRow';

import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import EditImageRow from './EditImageRow';
import { getSingleSubmission, updateSubmission } from '../../services/submission';

const AdminRow = ({ submission, expanded, setExpanded }) => {
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

  const adminRowSection = {
    location: 'location',
    id: 'id',
    details: 'details',
    image: 'image',
  };

  const returnSaveFunction = (editSection) => {
    switch (editSection) {
      case editSection === adminRowSection.location:
        locationSubmit();
      case editSection === adminRowSection.id:
        console.log('id');
      case editSection === adminRowSection.image:
        updateImage();
      case editSection === adminRowSection.details:
        detailsSubmit();
    }
  };

  const updateImage = (item = '', image_url = '', image_rev_url = '') => {
    const payload = {};
    if (item === 'del-image_url' || item === 'del-image_rev_url') {
      payload[item.substring(4)] = '';
    } else {
      if (image_url !== (tempState.img_url || '')) {
        payload.image_url = tempState.image_url;
      }
      if (image_rev_url !== (tempState.image_rev_url || '')) {
        payload.image_rev_url = tempState.image_rev_url;
      }
    }
    console.log(payload);
    updateSubmission(submission.item_id, payload)
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
          Unassigned
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
          {isEditing === adminRowSection.location && <LocationRow returnLocationSubmit={setLocationSubmit} />}
          {isEditing === adminRowSection.id && <>Edit ID</>}
          {isEditing === adminRowSection.details && (
            <EditDetailsRow returnDetailsSubmit={setDetailsSubmit} item={tempState} />
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
