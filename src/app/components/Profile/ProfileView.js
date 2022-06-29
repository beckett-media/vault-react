import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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
      <div className='row'>
        <div className='col'>
          <img className='img-thumbnail profile-image-thumb' src={user.img} />
        </div>
        <div className='col'>
          {user.name} <br />
          {user.email}
        </div>
      </div>
    </Container>
  );
};

export default ProfileView;
