import React, { useState, useEffect } from 'react';
import { getUser } from '../../services/user';
import './ProfileView.scss';

const ProfileView = () => {
  // todo: set is loading
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  return (
    <div className='profile-info_component'>
      <div className='profile-info_layout'>
        <div className='profile-info_image-wrapper'>
          <img className='profile-info_image' src={user.img} />
        </div>
        <div className='profile-info_content-wrapper'>
          <div className='profile-info_heading'>{user.name}</div>
          <div className='profile-info_body'>{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
