import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Modal, Spinner, CloseButton } from 'react-bootstrap';
import { mapCognitoToUser, mapUserToCognito } from '../../services/user';

import './Profile.scss';

import UserBanner from '../../components/UserBanner/UserBanner';
import FormSection from '../../components/Layout/FormSection/FormSection';

import { AuthContext } from '../../contexts/auth';
import { formatPhoneNumber } from '../../utils/phone';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../SignIn/ChangePassword';
import SubmitButton from '../../components/Generic/SubmitButton';
import { validateAddress } from '../../utils/validateAddress';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const user = mapCognitoToUser(authContext.attrInfo);
  const [userState, setUserState] = useState(user);
  const [isShippingSame, setIsShippingSame] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const launchChangePasswordModal = () => setShowChangePasswordModal(true);

  const navigate = useNavigate();

  const updateUserState = (tempItem) => setUserState({ ...userState, ...tempItem });

  const syncSubmissionAddresses = () => {
    const syncedAddresses = {
      shipCountry: userState.country,
      shipAddressLine1: userState.addressLine1,
      shipAddressLine2: userState.addressLine2,
      shipCity: userState.city,
      shipState: userState.state,
      shipZipcode: userState.zipcode,
    };

    updateUserState(syncedAddresses);
  };
  useEffect(() => {
    if (updateError !== undefined) {
      setLoadingModal(false);
    }
  }, [updateError]);

  useEffect(() => {
    if (isShippingSame) {
      syncSubmissionAddresses();
    }
  }, [isShippingSame]);

  const submitUpdateUser = async () => {
    let updatedUser;
    setLoadingModal(true);
    if (!userState.phone.length) {
      return setUpdateError('Phone number is required.');
    }
    try {
      await validateAddress({
        address1: userState.shipAddressLine1,
        address2: userState.shipAddressLine2,
        city: userState.shipCity,
        state: userState.shipState,
        zipcode: userState.shipZipcode,
      });
    } catch (err) {
      // setUpdateError(err.message)
      alert(
        'Warning: ' +
          err.message +
          ' However, the address has been updated, please verify that the address is correct.',
      );
    }
    if (userState.phone) {
      const phone = formatPhoneNumber(userState.phone);

      try {
        updatedUser = await authContext.setAttributes(mapUserToCognito({ ...userState, phone: phone }));
        updatedUser && navigate('/my-collection');
      } catch (err) {
        if (err.name === 'InvalidParameterException') {
          const paramArr = err.message.split(':');
          if (paramArr.length > 1) {
            const message = paramArr[1].split('attribute');
            setUpdateError(message[0] + paramArr[0].split('.')[1].replace('_', ' ') + message[1]);
          } else setUpdateError(err.message);
        } else {
          setUpdateError('An error has occurred.');
        }
      }
    }
    // TODO: on error?

    try {
      updatedUser = await authContext.setAttributes(mapUserToCognito(userState));
      updatedUser && navigate('/my-collection');
    } catch (err) {
      if (err.name === 'InvalidParameterException') {
        const paramArr = err.message.split(':');
        const message = paramArr[1].split('attribute');
        setUpdateError(message[0] + paramArr[0].split('.')[1].replace('_', ' ') + message[1]);
      } else {
        setUpdateError('An error has occurred.');
      }
    }
  };

  return (
    <div className='page-wrapper'>
      <UserBanner canEditImage={true} />
      {!loadingModal && (
        <FormSection title={'Contact Info'}>
          <>
            <Form className='profile_form' noValidate>
              <Card bg='Light' text='dark'>
                <Card.Body>
                  <Row className='mb-2'>
                    <Col>Billing Address</Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type='text'
                          value={userState.givenName}
                          onChange={(e) => updateUserState({ givenName: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type='text'
                          value={userState.familyName}
                          onChange={(e) => updateUserState({ familyName: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className='mb-2'>
                    <Form.Group>
                      <Form.Label>Country/Region</Form.Label>
                      <Form.Control
                        type='text'
                        value={userState.country}
                        onChange={(e) => updateUserState({ country: e.target.value })}
                      />
                    </Form.Group>
                  </Row>
                  <Row className='mb-2'>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type='text'
                        value={userState.addressLine1}
                        onChange={(e) => updateUserState({ addressLine1: e.target.value })}
                        className='mb-2'
                      />
                      <Form.Control
                        type='text'
                        value={userState.addressLine2}
                        onChange={(e) => updateUserState({ addressLine2: e.target.value })}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type='text'
                          value={userState.city}
                          onChange={(e) => updateUserState({ city: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type='text'
                          value={userState.state}
                          onChange={(e) => updateUserState({ state: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          type='text'
                          value={userState.zipcode}
                          onChange={(e) => updateUserState({ zipcode: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type='text'
                          value={userState.phone}
                          onChange={(e) => updateUserState({ phone: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className='my-4'>
                    <Col>Shipping Address</Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col>
                      <Form.Check
                        onClick={() => setIsShippingSame(!isShippingSame)}
                        type='checkbox'
                        label='Check if shipping address is the same'
                      />
                    </Col>
                  </Row>
                  {isShippingSame || (
                    <>
                      <Row className='mb-2'>
                        <Form.Group>
                          <Form.Label>Shipping Country/Region</Form.Label>
                          <Form.Control
                            type='text'
                            value={userState.shipCountry}
                            onChange={(e) => updateUserState({ shipCountry: e.target.value })}
                          />
                        </Form.Group>
                      </Row>
                      <Row className='mb-2'>
                        <Form.Group>
                          <Form.Label>Shipping Address</Form.Label>
                          <Form.Control
                            type='text'
                            value={userState.shipAddressLine1}
                            onChange={(e) => updateUserState({ shipAddressLine1: e.target.value })}
                            className='mb-2'
                          />
                          <Form.Control
                            type='text'
                            value={userState.shipAddressLine2}
                            onChange={(e) => updateUserState({ shipAddressLine2: e.target.value })}
                          />
                        </Form.Group>
                      </Row>
                      <Row className='mb-2'>
                        <Col>
                          <Form.Group>
                            <Form.Label>Shipping City</Form.Label>
                            <Form.Control
                              type='text'
                              value={userState.shipCity}
                              onChange={(e) => updateUserState({ shipCity: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Shipping State</Form.Label>
                            <Form.Control
                              type='text'
                              value={userState.shipState}
                              onChange={(e) => updateUserState({ shipState: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Shipping Zip</Form.Label>
                            <Form.Control
                              type='text'
                              value={userState.shipZipcode}
                              onChange={(e) => updateUserState({ shipZipcode: e.target.value })}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}
                </Card.Body>
                <Card.Footer>
                  <Row className='mb-2'>
                    <Col className='d-flex justify-content-end'>
                      <Button type='button' onClick={() => setConfirmModal(true)}>
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Form>
          </>
        </FormSection>
      )}
      <Modal className='loading-modal' show={loadingModal}>
        <Modal.Header>
          <span className='loading-header'>Updating Profile</span>
          <Spinner animation='border' role='status' variant='dark' />
        </Modal.Header>
      </Modal>
      <Modal className='update-error_modal' show={updateError.length}>
        <Modal.Header>
          <span className='update-error_header'>Error occurred updating profile</span>
          <CloseButton
            onClick={() => {
              setUpdateError(''), setLoadingModal(false);
            }}
          />
        </Modal.Header>
        <Modal.Body className='update-error_text'>
          <span>***{updateError}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setUpdateError(''), setLoadingModal(false);
            }}
            variant='dark'
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal className='confirm-modal' show={confirmModal}>
        <Modal.Header>
          <Modal.Title className='confirm-header'>{`Are you sure you'd like to submit?`}</Modal.Title>
          <CloseButton onClick={() => setConfirmModal(false)} />
        </Modal.Header>
        <Modal.Body className='confirm-text'>
          <span>Click Confirm to continue.</span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              submitUpdateUser(), setConfirmModal(false);
            }}
          >
            Confirm
          </Button>
          <ChangePassword showModal={showChangePasswordModal} setShowModal={setShowChangePasswordModal} />
          <SubmitButton func={launchChangePasswordModal} title='Change Password' bg='link' />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
