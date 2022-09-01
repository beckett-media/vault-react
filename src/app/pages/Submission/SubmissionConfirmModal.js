import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../../contexts/auth';
import { mapCognitoToUser, mapUserToCognito } from '../../services/user';
import { states } from '../../const/states';
import './Submission.scss';

const SubmissionConfirmModal = (props) => {
  const authContext = useContext(AuthContext);
  const user = { ...mapCognitoToUser(authContext.attrInfo) };
  const [userState, setUserState] = useState({ ...user });
  const incompleteUserAddress = !(user.addressLine1 && user.city && user.state && user.zipcode);
  const [editingUserAddress, setEditingUserAddress] = useState(false);
  const [error, setError] = useState(undefined);
  const { show, setConfirm, cancel, isLoading, userAddressConfirmed, confirmUserAddress } = props;
  const setUserAddress = async () => {
    try {
      await authContext.setAttributes(mapUserToCognito({ ...userState }));
      confirmUserAddress();
      window.location.reload();
    } catch (err) {
      setError('Try again');
    }
  };

  return (
    <>
      {
        //  Logic to render modal, depending on upon whether user has confirmed their address, need to update their address, or need to confirm a submission.
        !userAddressConfirmed ? (
          editingUserAddress || incompleteUserAddress ? (
            <Modal show={show} centered style={{ color: 'black' }}>
              <Modal.Header>
                <Modal.Title id='contained-modal-title-vcenter'>Complete your address to continue</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    placeholder='Address Line 1'
                    value={userState.addressLine1}
                    onChange={(e) => setUserState({ ...userState, shipAddressLine1: e.target.value })}
                  />
                  <Form.Control
                    placeholder='Address Line 2'
                    value={userState.addressLine2}
                    onChange={(e) => setUserState({ ...userState, shipAddressLine2: e.target.value })}
                  />
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    placeholder='City'
                    value={userState.city}
                    onChange={(e) => setUserState({ ...userState, shipCity: e.target.value })}
                  />
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    placeholder='State'
                    value={userState.state}
                    className='state-select'
                    onChange={(e) => setUserState({ ...userState, shipState: e.target.value })}
                  >
                    {states.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Control
                    placeholder='Zipcode'
                    value={userState.zipcode}
                    onChange={(e) => setUserState({ ...userState, shipZipcode: e.target.value })}
                  />
                </Form>
              </Modal.Body>
              <Modal.Footer>
                {error?.length ? <div>{error}</div> : <></>}
                <Button variant='secondary' onClick={() => cancel()}>
                  Cancel
                </Button>
                <Button
                  variant='primary'
                  onClick={() => {
                    setUserAddress();
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading' : 'Update'}
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            <Modal show={show} centered style={{ color: 'black' }}>
              <Modal.Header>
                <Modal.Title id='contained-modal-title-vcenter'>Confirm your address is correct</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>{`Address Line 1: ${user.addressLine1}`}</div>
                <div>{`Address Line 2: ${user.addressLine2}`}</div>
                <div>{`City: ${user.city}`}</div>
                <div>{`State: ${user.state}`}</div>
                <div>{`Zipcode: ${user.zipcode}`}</div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={() => setEditingUserAddress(true)}>
                  Edit
                </Button>
                <Button
                  variant='primary'
                  onClick={() => {
                    confirmUserAddress();
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading' : 'Confirm'}
                </Button>
              </Modal.Footer>
            </Modal>
          )
        ) : (
          <Modal className='text-body' show={show} onHide={() => cancel()}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you'd like to submit?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Once submitted, your items will be staged for vaulting.</Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => cancel()}>
                Cancel
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  setConfirm();
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Loading' : 'Confirm submit'}
              </Button>
            </Modal.Footer>
          </Modal>
        )
      }
    </>
  );
};

export default SubmissionConfirmModal;
