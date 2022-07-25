import React, { useState, useEffect } from 'react';

import './UserBanner.scss';

import UserInfo from '../UserInfo/UserInfo';

import { getUser } from '../../services/user';
import { ReactComponent as BgSphere } from '../../assets/bg-sphere.svg';

const UserBanner = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  return (
    <div className='user-banner_component'>
      <BgSphere className='user-banner_bg-sphere' />
      <div className='page-padding'>
        <div className='container-large'>
          <div className='user-banner_layout'>
            <div className='user-banner_image-wrapper'>
              <img className='user-banner_image' src={user.img} />
            </div>
            <div className='user-banner_content-layout'>
              <div className='user-banner_heading'>{user.name}</div>
              <div className='user-banner_body'>Vaulted Items</div>
              <div className='user-banner_body'>Vaulted Value</div>
              {/* Todo: add dynamic date-joined field */}
              <div className='user-banner_body'>joined June, 2022</div>
              <div className='user-banner_stat-content'>14</div>
              <div className='user-banner_stat-content'>$123,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
