import React, { useLayoutEffect, useState } from 'react';
import { Button, Form, ListGroup, Spinner } from 'react-bootstrap';
import { BsFileEarmarkFill, BsFileEarmark, BsPrinter, BsTrash } from 'react-icons/bs';

import AdminRowExpanded from './AdminRowExpanded';
import EditDetailsRow from './EditDetailsRow';
import EditImageRow from './EditImageRow';
import LocationRow from './LocationRow';

import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import { CASCADE_TYPE, useInventoryLocation } from '../../hooks/useInventoryLocation';
import { createVaulting, ITEM_TYPE, VAULTING_STATUS } from '../../services/items';
import {
  approveRejectSubmissions,
  SUBMISSION_STATUS,
  undeleteSubmission,
  updateSubmission,
} from '../../services/submission';
import { getSubmissionTitle } from '../../utils/submissions';
import { ACTION_LABEL, ADMIN_ROW_SECTION, ITEM_OR_ORDER, SubmissionStatusOptions } from './const';
import SubmissionPrint from './SubmissionPrint';
import { removeTrailingDashes } from '../../utils/strings';
import CardPlaceholder from '../../assets/CardPlaceholder';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const AdminRow = ({ item: _item, cards, comics, setFilterBy }) => {
  const [isEditing, setIsEditing] = useState('');
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [tempState, setTempState] = useState({});
  const [error, setError] = useState('');
  const [statusValue, setStatusValue] = useState(_item.status);
  const [item, setItem] = useState(_item);
  const [showPrint, setShowPrint] = useState('init');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const currentTime = new Date();
  const initState = React.useCallback((itemData) => {
    setStatusValue(itemData.status);
    setItem(itemData);
  }, []);

  const {
    // initialInventory,
    inventory,
    currentLocation,
    postLocation,
    isPostLoading,
    isGetLoading,
    updateInventory,
    setCascade,
    cascade,
  } = useInventoryLocation(item.item_id, comics, cards);

  useLayoutEffect(() => {
    const element = document.getElementById('del-' + item.item_id);
    element?.classList.remove('btn-primary');
  });

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

    return removeTrailingDashes(
      `${abbreviatedVault}-${abbreviatedZone}-${shelf || ''}-${row || ''}-${box || ''}-${slot || ''}`,
    );
  };

  const returnSaveFunction = (editSection) => {
    switch (editSection) {
      case ADMIN_ROW_SECTION.LOCATION:
        postLocation(() => setIsEditing(''));
        break;
      case ADMIN_ROW_SECTION.IMAGE:
        updateImage();
        break;
      case ADMIN_ROW_SECTION.DETAILS:
        updateDetails();
        break;
      case ADMIN_ROW_SECTION.NOTES:
        updateNotes();
    }
  };

  const returnLoadingState = (editSection) => {
    switch (editSection) {
      case ADMIN_ROW_SECTION.LOCATION:
        return isPostLoading;
      case ADMIN_ROW_SECTION.IMAGE:
      case ADMIN_ROW_SECTION.DETAILS:
        return isUpdateLoading;
    }
    return false;
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

    setIsUpdateLoading(true);
    updateSubmission(item.item_id, payload)
      .then((data) => {
        initState(data);
        setIsEditing('');
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsUpdateLoading(false);
      });
    return;
  };

  const validateDetails = () => {
    let payload = {};
    const requiredCardFields = [
      'player',
      'sport',
      'set_name',
      'card_number',
      'grading_company',
      'serial_number',
      'title',
      'year',
      'grade',
      'sub_grades',
      'est_value',
    ];
    const requiredcomicFields = [
      'title',
      'issue',
      'publisher',
      'grading_company',
      'serial_number',
      'title',
      'year',
      'grade',
      'sub_grades',
      'est_value',
    ];
    const requiredFields = item['type_desc'] === 'Card' ? requiredCardFields : requiredcomicFields;
    Object.keys(item).map((itm) => {
      if (
        !requiredFields.includes(itm) ||
        (requiredFields.includes(itm) && tempState[itm] !== 0 && tempState[itm] !== '')
      ) {
        if (tempState[itm] !== item[itm]) {
          payload[itm] = tempState[itm];
        }
      } else {
        const missingField = itm
          .split('_')
          .map((word) => word[0].toUpperCase() + word.substring(1))
          .join(' ');
        throw new Error(`Required field ${missingField} is missing.`);
      }
    });
    return payload;
  };
  const updateDetails = async () => {
    let payload = {};
    try {
      payload = await validateDetails();
      setIsUpdateLoading(true);
      updateSubmission(item.item_id, payload)
        .then((data) => {
          initState(data);
          setIsEditing('');
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsUpdateLoading(false);
        });
      return;
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const updateNotes = () => {
    const payload = {};
    payload.notes = tempState.notes;
    setIsUpdateLoading(true);
    updateSubmission(item.item_id, payload)
      .then((data) => {
        initState(data);
        setIsEditing('');
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsUpdateLoading(false);
      });
    return;
  };

  const cascadeToggleHanlder = () => {
    if (!!cascade) setCascade('');
    else if (item.type === ITEM_TYPE.COMIC) setCascade(CASCADE_TYPE.COMIC);
    else if (item.type === ITEM_TYPE.TRADING_CARD) setCascade(CASCADE_TYPE.CARD);
  };

  const handleStatusSelectChange = (e) => {
    const newState = Number(e.target.value);

    setStatusValue(newState);
  };

  const handleActionClick = (e) => {
    const action = e.target.innerText;

    if (action === ACTION_LABEL.VALIDATE) {
      setIsActionLoading(true);
      approveRejectSubmissions(item.item_id, item.type, true)
        .then((data) => {
          initState(data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsActionLoading(false);
        });
    } else if (action === ACTION_LABEL.UNDELETE) {
      setIsActionLoading(true);
      undeleteSubmission(item.item_id)
        .then((data) => {
          initState(data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsActionLoading(false);
          setFilterBy('Filter');
        });
    } else if (action === ACTION_LABEL.VAULT) {
      setIsActionLoading(true);
      createVaulting({
        item_id: item.item_id,
        user: item.user,
        submission_id: item.id,
      })
        .then((res) => {
          initState({
            ...item,
            status: SUBMISSION_STATUS.Vaulted,
          });
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsActionLoading(false);
        });
    } else if (action === ACTION_LABEL.LINK_IMAGES) {
      handleImageEditClick();
    } else if (action === ACTION_LABEL.ASSIGN_VAULT) {
      setIsEditing(ADMIN_ROW_SECTION.LOCATION);
    }
  };

  const handlePrintClose = React.useCallback(() => {
    setShowPrint('closed');
  }, []);

  const getActionLabel = () => {
    if (!item.is_active) {
      return ACTION_LABEL.UNDELETE;
    }

    if (item.status === SUBMISSION_STATUS.Submitted) {
      return ACTION_LABEL.START;
    } else if (item.status === SUBMISSION_STATUS.Received) {
      return ACTION_LABEL.VALIDATE;
    }

    if (item.status === SUBMISSION_STATUS.Approved) {
      if (!currentLocation) {
        return ACTION_LABEL.ASSIGN_VAULT;
      }

      if (!item.image_url || !item.image_rev_url) {
        return ACTION_LABEL.LINK_IMAGES;
      }

      return ACTION_LABEL.VAULT;
    }

    return ACTION_LABEL.DONE;
  };

  const handleImageEditClick = () => {
    setTempState({ image_url: item.image_url, image_rev_url: item.image_rev_url });
    setError('');
    setIsEditing(ADMIN_ROW_SECTION.IMAGE);
  };

  const handleSubmissionEditClick = () => {
    setTempState(item);
    setError('');
    setIsEditing(ADMIN_ROW_SECTION.DETAILS);
  };

  const isStatusPending = item.status === SUBMISSION_STATUS.Submitted;
  const isStatusSelectDisabled = item.status === SUBMISSION_STATUS.Failed || item.status >= SUBMISSION_STATUS.Vaulted;

  const actionLabel = getActionLabel();
  const isActionDisabled = actionLabel === ACTION_LABEL.START || actionLabel === ACTION_LABEL.DONE;
  const showPrintButton =
    item.status !== SUBMISSION_STATUS.Submitted &&
    item.status !== SUBMISSION_STATUS.Received &&
    currentLocation &&
    actionLabel !== ACTION_LABEL.DONE;

  const addRetryButton =
    item.updated_at !== 0 &&
    Date.parse(currentTime) / 1000 - item.updated_at > 300 &&
    item.status_desc === VAULTING_STATUS.Minting;

  const handleRetry = () => {
    setIsActionLoading(true);
    createVaulting({
      item_id: item.item_id,
      user: item.user,
      submission_id: item.id,
    })
      .then((res) => {
        initState({
          ...item,
          status: SUBMISSION_STATUS.Vaulted,
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsActionLoading(false);
      });
  };
  const handleChangeNotes = () => {
    if (isEditing === ADMIN_ROW_SECTION.NOTES) {
      setIsEditing('');
    } else setIsEditing(ADMIN_ROW_SECTION.NOTES);
  };

  return (
    <>
      <ListGroup.Item className='admin-page_table-row'>
        {/* <div>{!isStatusPending && <Form.Check></Form.Check>}</div> */}
        <div className='d-flex gap-1 align-items-center'>
          {!item.image_url || item.image_url[0] === '.' ? (
            <div className='img_thumbnail'>
              <CardPlaceholder width={30} />
            </div>
          ) : (
            <img className='img_thumbnail' src={item.image_url} />
          )}
          {!isStatusPending && <PencilIcon onClick={handleImageEditClick} />}
        </div>
        <div className='d-flex gap-1 align-items-center'>{item.order_id}</div>
        <div className='d-flex gap-1 align-items-center'>{item.item_id}</div>
        <div className='d-flex gap-1 align-items-center'>
          {getSubmissionTitle(item)}
          {!isStatusPending && <PencilIcon onClick={handleSubmissionEditClick} />}
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
          {addRetryButton && (
            <Button className='admin-row_retry-button' onClick={() => handleRetry()}>
              Retry
            </Button>
          )}
        </div>
        <div className='d-flex gap-1 align-items-center'>
          {returnLocationLabel(currentLocation)}
          {!isStatusPending && <PencilIcon onClick={() => setIsEditing(ADMIN_ROW_SECTION.LOCATION)} />}
        </div>
        <div>
          {showPrintButton && (
            <Button className={`w-8 admin-row_print-button`} onClick={() => setShowPrint('open')}>
              <BsPrinter />
            </Button>
          )}
        </div>
        <div>
          <Button
            className={`w-80 print-status-${showPrint} admin-row_action-button`}
            disabled={isActionDisabled}
            onClick={handleActionClick}
          >
            {isGetLoading || isActionLoading ? (
              <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            ) : (
              actionLabel
            )}
          </Button>
        </div>

        {item.notes ? (
          <div>
            <BsFileEarmarkFill size={25} onClick={handleChangeNotes} />
          </div>
        ) : (
          <div>
            <BsFileEarmark size={25} onClick={handleChangeNotes} />
          </div>
        )}

        {item.is_active && (
          <div>
            <Button
              id={'del-' + item.id}
              className={`w-8 admin-row_delete-button`}
              onClick={() => setConfirmDelete(true)}
            >
              <BsTrash />
            </Button>
          </div>
        )}

        <DeleteConfirmationModal
          itemOrOrder={ITEM_OR_ORDER.ITEM}
          confirmDelete={confirmDelete}
          id={item.item_id}
          setConfirmDelete={setConfirmDelete}
          setFilterBy={setFilterBy}
        />
      </ListGroup.Item>
      {!!isEditing && (
        <AdminRowExpanded
          onCancel={() => setIsEditing('')}
          onSave={() => returnSaveFunction(isEditing)}
          isLoading={returnLoadingState(isEditing)}
          className='text-body'
          setCascade={setCascade}
        >
          {isEditing === ADMIN_ROW_SECTION.NOTES && (
            <div className='admin-page_notes-edit-field'>
              <div className='notes-pad'>Notes:</div>
              <Form.Control
                value={tempState.notes}
                onChange={(e) => setTempState({ ...tempState, notes: e.target.value.substring(0, 255) })}
                as='textarea'
                rows={3}
              />
            </div>
          )}
          {isEditing === ADMIN_ROW_SECTION.LOCATION && (
            <LocationRow
              updateInventory={updateInventory}
              inventory={inventory}
              cascadeToggleHanlder={cascadeToggleHanlder}
            />
          )}
          {isEditing === ADMIN_ROW_SECTION.DETAILS && (
            <EditDetailsRow tempState={tempState} setTempState={setTempState} />
          )}
          {isEditing === ADMIN_ROW_SECTION.IMAGE && (
            <EditImageRow
              tempState={tempState}
              item={item}
              error={error}
              setTempState={setTempState}
              updateImage={updateImage}
            />
          )}
          {error && (
            <div className='error-container'>
              <div className='error'>{error.message}</div>
            </div>
          )}
        </AdminRowExpanded>
      )}
      {showPrint === 'open' && (
        <SubmissionPrint item={item} locationLabel={returnLocationLabel(currentLocation)} onClose={handlePrintClose} />
      )}
    </>
  );
};

export default AdminRow;
