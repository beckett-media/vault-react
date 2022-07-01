import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { getUser } from '../../services/user';
import './Profile.scss';

const ProfileView = () => {
  // todo: set is loading
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <img className='img-thumbnail profile-image-thumb' src={user.img} />
        </Col>
        <Col>
          {user.name} <br />
          {user.email}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
