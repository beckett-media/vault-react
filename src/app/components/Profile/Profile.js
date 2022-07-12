import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { getUser, updateUser } from '../../services/user';
import './Profile.scss';

const Profile = () => {
  // todo: set is loading
  const [user, setUser] = useState([]);
  const [userState, setUserState] = useState({});
  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
      // TODO: make sure this works for userState too.
      // we might need to map something
      setUserState(data);
    });
  }, []);

  const updateUserState = (tempItem) =>
    setUserState({ ...userState, ...tempItem });

  const submitUpdateUser = () => {
    updateUser(userState);
  };
  return (
    <Container>
      <Form>
        <Row className='justify-content-center'>
          <Col lg='6'>
            <h2>Profile</h2>
          </Col>
        </Row>
        <Row className='justify-content-center mb-2'>
          <Col lg='6'>
            <Row className='mb-2'>
              <Col>
                {/* TODO: change image code, s3 or just a url? */}
                <img src={user.img} className='img-thumbnail' />
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
                          value={userState.firstName}
                          onChange={(e) =>
                            updateUserState({ firstName: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type='text'
                          value={userState.lastName}
                          onChange={(e) =>
                            updateUserState({ lastName: e.target.value })
                          }
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
                        onChange={(e) =>
                          updateUserState({ country: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row className='mb-2'>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type='text'
                        value={userState.address1}
                        onChange={(e) =>
                          updateUserState({ address1: e.target.value })
                        }
                      />
                      <Form.Control
                        type='text'
                        value={userState.address2}
                        onChange={(e) =>
                          updateUserState({ address2: e.target.value })
                        }
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
                          onChange={(e) =>
                            updateUserState({ city: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type='text'
                          value={userState.state}
                          onChange={(e) =>
                            updateUserState({ state: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          type='text'
                          value={userState.zip}
                          onChange={(e) =>
                            updateUserState({ zip: e.target.value })
                          }
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
