import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getUser } from '../../services/user';
import './profile.scss';

const Profile = () => {
  // todo: set is loading
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  return (
    <Container fluid>
      <Row className='justify-content-center'><h2>Profile</h2></Row>
      <Row>
        <Col>
          <img src={user.img} className='img-thumbnail' />
        </Col>

        <Col>
          <Row className='mb-2'>
            <Col>
              <input
                id='name'
                type='text'
                value={user.name}
                className='transparent-text-input border border-dark rounded-pill'
                placeholder={'Name*'}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <input
                id='email'
                type='text'
                value={user.email}
                className='transparent-text-input border border-dark rounded-pill'
                placeholder={'Email*'}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <input
                type='button'
                className='border border-info rounded-pill ghost-btn'
                value='Save Profile'
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
