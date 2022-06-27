import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
      <div className="row">
        <div className="col">
          <Link to="/settings">
            <h3>{user.name}</h3>
            <img src={user.img} />
          </Link>
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
