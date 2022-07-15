import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { mapCognitoToUser, mapUserToCognito } from '../../services/user';
import './Profile.scss';
import UserInfo from '../../components/UserInfo/UserInfo';
import { AuthContext } from '../../contexts/auth';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const user = mapCognitoToUser(authContext.attrInfo);
  const [userState, setUserState] = useState(user);

  const updateUserState = (tempItem) => setUserState({ ...userState, ...tempItem });

  const submitUpdateUser = async () => {
    // TODO: on error?
    await authContext.setAttributes(mapUserToCognito(userState));
  };

  return (
    <Container>
      <Form>
        <Row className='justify-content-center m-2'>
          <Col lg='6'>
            <Row className='mb-2'>
              <Col>
                <UserInfo />
                <hr className='m-2' />
              </Col>
            </Row>
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
                      />
                      <Form.Control
                        type='text'
                        value={userState.addressLine2}
                        onChange={(e) => updateUserState({ addressLine2: e.target.value })}
                      />
                    </Form.Group>
                  </Row>
                  <Row className='mb-2'>
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
                          value={userState.zip}
                          onChange={(e) => updateUserState({ zip: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col>
                      <Button onClick={() => submitUpdateUser()}>Save</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Profile;
