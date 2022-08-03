import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { getUser, getUserName, mapCognitoToUser } from '../../services/user';
import './UserInfo.scss';

const UserInfo = () => {
  // todo: set is loading
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);

  return (
    <div className='profile-info_component'>
      <div className='profile-info_layout'>
        <div className='profile-info_image-wrapper'>
          <img className='profile-info_image' src={user.img} />
        </div>
        <div className='profile-info_content-wrapper'>
          <div className='profile-info_heading'>{/*getUserName(userState)*/ '@super_user37'}</div>
          {/* Todo: add dynamic date-joined field */}
          <div className='profile-info_body'>joined July, 2022</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
