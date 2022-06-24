import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getUser } from '../../services/user';
import './Profile.scss';

const Profile = () => {
  // todo: set is loading
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  return (
    <Container fluid>
      <div className="row" onClick={toggleDropdown}>Profile</div>
      <div className="row">
        <div className="col">
          <h3>{user.name}</h3>
          <img src={user.img} />
        </div>
        {/* This box should be on an individual page to edit profile. */}
        {/* {
          <div className="col">
            <input
              id="name"
              type="text"
              value={user.name}
              className="transparent-text-input border border-dark rounded-pill"
              placeholder={'Name*'}
            />
            <input
              id="email"
              type="text"
              value={user.email}
              className="transparent-text-input border border-dark rounded-pill"
              placeholder={'Email*'}
            />
            <input
              type="button"
              className="border border-info rounded-pill ghost-btn"
              value="Save Profile"
            />
          </div>
        } */}
      </div>
    </Container>
  );
};

export default Profile;
