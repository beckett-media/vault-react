import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { mapCognitoToUser, mapUserToCognito } from '../../services/user';
import './Profile.scss';
import UserBanner from '../../components/UserBanner/UserBanner';
import { AuthContext } from '../../contexts/auth';
import { formatPhoneNumber } from '../../utils/phone';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const user = mapCognitoToUser(authContext.attrInfo);
  const [userState, setUserState] = useState(user);
  const [isShippingSame, setIsShippingSame] = useState(false);

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

  const submitUpdateUser = async (submission) => {
    submission.preventDefault();
    if (isShippingSame) {
      syncSubmissionAddresses();
    }
    if(userState.phone){
      const phone = formatPhoneNumber(userState.phone)
      return await authContext.setAttributes(mapUserToCognito({...userState, phone: phone}));
    }
    // TODO: on error?
    await authContext.setAttributes(mapUserToCognito(userState));
  };

  return (
    <div className='page-wrapper'>
      <UserBanner />
      <Form noValidate onSubmit={submitUpdateUser}>
        <Row className='justify-content-center m-2'>
          <Col>
            <Row>
              <Card bg='Light' text='dark'>
                <Card.Header>
                  <Card.Title>
                    <h2>Contact Info</h2>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
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
                  <Row className='mb-2'>
                    <Col>
                      <Button type='submit'>Save</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Profile;
