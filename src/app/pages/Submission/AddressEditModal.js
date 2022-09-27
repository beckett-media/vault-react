import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../../contexts/auth';
import { isIncompleteAddress, mapCognitoToUser, mapUserToCognito } from '../../services/user';
import { states } from '../../const/states';
import './Submission.scss';
import { useNavigate } from 'react-router-dom';

const AddressEditModal = (props) => {
  const { open, onClose } = props;
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const user = mapCognitoToUser(authContext.attrInfo);
  const [userState, setUserState] = useState({ ...user });
  const [error, setError] = useState(undefined);

  const incompleteUserAddress = isIncompleteAddress(user);
  useEffect(() => setError(undefined), [userState]);
  const [isEditing, setEditing] = useState(incompleteUserAddress);
  const [isLoading, setIsLoading] = useState(false);

  const updateUserAddress = async () => {
    try {
      await validateAddress({
        address1: userState.shipAddressLine1,
        address2: userState.shipAddressLine2,
        city: userState.shipCity,
        state: userState.shipState,
        zipcode: userState.shipZipcode,
      });
      try {
        setIsLoading(true);
        await authContext.setAttributes(mapUserToCognito({ ...userState }));
        onClose();
      } catch (err) {
        // This is a cognito error.
        setError('Try again');
      } finally {
        setIsLoading(false);
      }
    } catch (err) {
      // This is an address validation error from usps api.
      setError(err.message);
      await authContext.setAttributes(mapUserToCognito({ ...userState }));
    }
  };

  const cancelCompleteAddress = () => {
    navigate(-1);
    onClose();
  };

  const onEditDone = (e) => {
    e.preventDefault();

    if (!isIncompleteAddress(userState)) {
      setEditing(false);
    } else {
      alert('Address is yet not complete');
    }
  };

  const editModalContents = () => (
    <Form onSubmit={onEditDone}>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>Complete your address to continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Address</Form.Label>
        <Form.Control
          placeholder='Address Line 1'
          value={userState.shipAddressLine1}
          required
          onChange={(e) => setUserState({ ...userState, shipAddressLine1: e.target.value })}
        />
        <Form.Control
          placeholder='Address Line 2'
          value={userState.shipAddressLine2}
          onChange={(e) => setUserState({ ...userState, shipAddressLine2: e.target.value })}
        />
        <Form.Label>City</Form.Label>
        <Form.Control
          placeholder='City'
          required
          value={userState.shipCity}
          onChange={(e) => setUserState({ ...userState, shipCity: e.target.value })}
        />
        <Form.Label>State</Form.Label>
        <Form.Select
          required
          value={userState.shipState}
          className='state-select'
          onChange={(e) => setUserState({ ...userState, shipState: e.target.value })}
        >
          <option disabled selected>
            - Select -
          </option>
          {states.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
        <Form.Label>Zipcode</Form.Label>
        <Form.Control
          placeholder='Zipcode'
          required
          value={userState.shipZipcode}
          onChange={(e) => setUserState({ ...userState, shipZipcode: e.target.value })}
        />
      </Modal.Body>
      <Modal.Footer>
        {error?.length ? <div className='address-error'>{error}</div> : <></>}
        <Button variant='secondary' onClick={cancelCompleteAddress}>
          Cancel
        </Button>
        <Button variant='primary' type='submit'>
          Update
        </Button>
      </Modal.Footer>
    </Form>
  );

  const confirmModalContents = () => (
    <>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>Confirm your address is correct</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{`Address Line 1: ${userState.shipAddressLine1 || ''}`}</div>
        <div>{`Address Line 2: ${userState.shipAddressLine2 || ''}`}</div>
        <div>{`City: ${userState.shipCity || ''}`}</div>
        <div>{`State: ${userState.shipState || ''}`}</div>
        <div>{`Zipcode: ${userState.shipZipcode || ''}`}</div>
        {error && <span className='address-error'>{error}</span>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setEditing(true)}>
          Edit
        </Button>
        {!error ? (
          <Button variant='primary' onClick={updateUserAddress} disabled={isLoading}>
            {isLoading ? 'Loading' : 'Confirm'}
          </Button>
        ) : (
          <Button variant='dark'>Confirm</Button>
        )}
      </Modal.Footer>
    </>
  );

  return (
    <Modal show={open || incompleteUserAddress} centered style={{ color: 'black' }}>
      {isEditing ? editModalContents() : confirmModalContents()}
    </Modal>
  );
};

export default AddressEditModal;
