import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

import AdminRowExpanded from './AdminRowExpanded';
import EditDetailsRow from './EditDetailsRow';
import EditImageRow from './EditImageRow';
import LocationRow from './LocationRow';

import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import { useInventoryLocation } from '../../hooks/useInventoryLocation';
import { getSubmissionTitle } from '../../utils/submissions';
import { ITEM_TYPE } from '../../services/items';
import { approveRejectSubmissions, SUBMISSION_STATUS, updateSubmission } from '../../services/submission';

const SubmissionStatusOptions = [
  {
    name: 'Failed',
    value: SUBMISSION_STATUS.Failed,
  },
  {
    name: 'Submitted',
    value: SUBMISSION_STATUS.Submitted,
  },
  {
    name: 'Received',
    value: SUBMISSION_STATUS.Received,
  },
  // {
  //   name: 'Rejected',
  //   value: SUBMISSION_STATUS.Rejected,
  // },
  {
    name: 'Approved',
    value: SUBMISSION_STATUS.Approved,
  },
  {
    name: 'Vaulted',
    value: SUBMISSION_STATUS.Vaulted,
  },
];

const adminRowSection = {
  location: 'location',
  details: 'details',
  image: 'image',
};

const defaultAction = 'Default';

const AdminRow = ({ item: _item, cards, comics }) => {
  const [isEditing, setIsEditing] = useState('');
  const [tempState, setTempState] = useState({});
  const [error, setError] = useState('');
  const [actionLabel, setActionLabel] = useState(defaultAction);
  const [statusValue, setStatusValue] = useState(_item.status);
  const [item, setItem] = useState(_item);

  const initState = React.useCallback((itemData) => {
    setStatusValue(itemData.status);
    setItem(itemData);
    setActionLabel(defaultAction);
  }, []);

  const {
    initialInventory,
    inventory,
    currentLocation,
    postLocation,
    isPostLoading,
    updateInventory,
    setCascade,
    cascade,
  } = useInventoryLocation(item.item_id, comics, cards);

  const returnLocationLabel = (locationObject) => {
    if (!locationObject) return 'Unassigned';

    const { row, shelf, box, slot, vault, zone } = locationObject;

    const abbreviatedVault = vault === 'dallas' ? 'DAL' : 'DEL';

    let abbreviatedZone;

    if (zone.includes('cabinet')) {
      abbreviatedZone = 'CAB' + zone.at(-1);
    }
    if (zone.includes('credenza')) {
      abbreviatedZone = 'CRED' + zone.at(-1);
    }
    if (zone.includes('gallery')) {
      abbreviatedZone = 'GALLERY';
    }
    if (zone.includes('main')) {
      abbreviatedZone = 'MAIN';
    }
    if (zone.includes('pedestal')) {
      abbreviatedZone = 'PED' + zone.at(-1);
    }

    return `${abbreviatedVault}-${abbreviatedZone}-${shelf || ''}-${row || ''}-${box || ''}-${slot || ''}`;
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

  const returnLoadingState = (editSection) => {
    switch (editSection) {
      case adminRowSection.location:
        return isPostLoading;
      case adminRowSection.id:
        // TODO
        break;
      case adminRowSection.image:
        // TODO
        break;
      case adminRowSection.details:
        // TODO
        break;
    }
  };

  const updateImage = (itemVal = '') => {
    const payload = {};
    if (itemVal === 'del-image_path' || itemVal === 'del-image_rev_path') {
      payload[itemVal.substring(4)] = '../../assets/beckett-card-placeholder--gray.svg';
    } else {
      if (tempState.image_url !== item.img_url) {
        payload.image_path = tempState.image_url;
      }
      if (tempState.image_rev_url !== item.image_rev_url) {
        payload.image_rev_path = tempState.image_rev_url;
      }
    }
    updateSubmission(item.item_id, payload)
      .then((data) => {
        initState(data);
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
      .then((data) => {
        initState(data);
      })
      .catch((err) => {
        setError(err.message);
      });
    return;
  };

  const cascadeToggleHanlder = () => {
    if (!!cascade) setCascade('');
    else if (item.type === ITEM_TYPE.COMIC) setCascade('comic');
    else if (item.type === ITEM_TYPE.TRADING_CARD) setCascade('card');
  };

  const handleStatusSelectChange = (e) => {
    const newState = Number(e.target.value);

    setStatusValue(newState);

    if (newState === SUBMISSION_STATUS.Approved) {
      if (item.status !== SUBMISSION_STATUS.Approved) {
        return setActionLabel('Approve');
      }
    } else if (newState === SUBMISSION_STATUS.Rejected) {
      if (item.status !== SUBMISSION_STATUS.Rejected) {
        return setActionLabel('Reject');
      }
    } else if (newState === SUBMISSION_STATUS.Vaulted) {
      if (item.status !== SUBMISSION_STATUS.Vaulted) {
        return setActionLabel('Vault');
      }
    }

    setActionLabel(defaultAction);
  };

  const handleActionClick = () => {
    if (actionLabel === 'Approve' || actionLabel === 'Reject') {
      approveRejectSubmissions(item.item_id, item.type, actionLabel === 'Approve')
        .then((data) => {
          initState(data);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else if (actionLabel === 'Vault') {
      createVaulting({
        item_id: item.item_id,
        user: item.user,
        submission_id: item.id,
      })
        .then((res) => {
          console.log('vaulting result', res);
          initState({
            ...item,
            status: SUBMISSION_STATUS.Vaulted,
          });
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const isStatusPending = item.status === SUBMISSION_STATUS.Submitted;
  const isStatusSelectDisabled = item.status === SUBMISSION_STATUS.Failed || item.status >= SUBMISSION_STATUS.Vaulted;
  const isValutEnabled =
    !!currentLocation && item.status === SUBMISSION_STATUS.Approved && !!item.image_url && !!item.image_rev_url;

  const isActionDisabled =
    actionLabel === defaultAction || isStatusPending || (actionLabel === 'Vault' && !isValutEnabled);

  return (
    <>
      <ListGroup.Item className='admin-page_table-row'>
        <div>{!isStatusPending && <Form.Check></Form.Check>}</div>
        <div className='d-flex gap-1 align-items-center'>
          <img className='img_thumbnail' src={item.image_url} />
          {!isStatusPending && (
            <PencilIcon
              onClick={() => {
                setTempState({ image_url: item.image_url, image_rev_url: item.image_rev_url });
                setError('');
                setIsEditing(adminRowSection.image);
              }}
            />
          )}
        </div>
        <div className='d-flex gap-1 align-items-center'>{item.item_id}</div>
        <div className='d-flex gap-1 align-items-center'>
          {getSubmissionTitle(item)}
          {!isStatusPending && (
            <PencilIcon
              onClick={() => {
                setTempState(item);
                setError('');
                setIsEditing(adminRowSection.details);
              }}
            />
          )}
        </div>
        <div>
          <Form.Select
            aria-label='Status select dropdown'
            value={statusValue}
            onChange={handleStatusSelectChange}
            disabled={isStatusSelectDisabled}
          >
            {SubmissionStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className='d-flex gap-1 align-items-center'>
          {returnLocationLabel(currentLocation)}
          {!isStatusPending && <PencilIcon onClick={() => setIsEditing(adminRowSection.location)} />}
        </div>
        <div>
          <Button className='w-100' disabled={isActionDisabled} onClick={handleActionClick}>
            {actionLabel}
          </Button>
        </div>
      </ListGroup.Item>
      {!!isEditing && (
        <AdminRowExpanded
          onCancel={() => setIsEditing('')}
          onSave={() => returnSaveFunction(isEditing)}
          isLoading={returnLoadingState(isEditing)}
          className='text-body'
          setCascade={setCascade}
        >
          {isEditing === adminRowSection.location && (
            <LocationRow
              updateInventory={updateInventory}
              inventory={inventory}
              cascadeToggleHanlder={cascadeToggleHanlder}
            />
          )}
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
