import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { getUserName, mapCognitoToUser } from '../../services/user';

import './UserBanner.scss';

import { ReactComponent as BgSphere } from '../../assets/bg-sphere.svg';
import { formatPrice } from '../../utils/strings';

const UserBanner = (props) => {
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);

  return (
    <div className='user-banner_component'>
      <BgSphere className='user-banner_bg-sphere z-index-0' />
      <div className='page-padding z-index-1 position-relative'>
        <div className='container-large'>
          <div className='user-banner_layout'>
            <div className='user-banner_image-wrapper'>
              <img className='user-banner_image' src={userState.profile || require('../../assets/stockImage.jpeg')} />
            </div>
            {props.bannerDetails || <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
