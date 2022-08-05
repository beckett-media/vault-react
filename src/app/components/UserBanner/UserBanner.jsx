import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { getUserName, mapCognitoToUser } from '../../services/user';

import './UserBanner.scss';

import { ReactComponent as BgSphere } from '../../assets/bg-sphere.svg';
import { formatPrice } from '../../utils/strings';

const UserBanner = ({ vaultedItems = 0, vaultedValue = 0 }) => {
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);
  const isProfilePage = window.location.pathname === '/profile';

  return (
    <div className= {isProfilePage ? 'user-info_component' : 'profile-banner_component'}>
      {isProfilePage && 
      <div className='profile-info_layout'>
        <div className='profile-info_image-wrapper'>
          <img
            className='profile-info_image'
            src={'https://www.sideshow.com/storage/product-images/907776/superman_dc-comics_square.jpg'}
          />
        </div>
        <div className='profile-info_content-wrapper'>
          <div className='profile-info_heading'>{getUserName(userState)}</div>
          {/* Todo: add dynamic date-joined field */}
          <div className='profile-info_body'>joined July, 2022</div>
        </div>
      </div>}

      {!isProfilePage && <BgSphere className='user-banner_bg-sphere z-index-0' />}

      {!isProfilePage && 
      <div className='page-padding z-index-1 position-relative'>
        <div className='container-large'>
          <div className='user-banner_layout'>
            <div className='user-banner_image-wrapper'>
              <img className='user-banner_image' src={userState.profile || require('../../assets/stockImage.jpeg')} />
            </div>
            <div className='user-banner_content-layout'>
              <div className='user-banner_heading user-banner_grid-1'>{getUserName(userState)}</div>
              <div className='user-banner_body user-banner_grid-2'>Vaulted Items</div>
              <div className='user-banner_body user-banner_grid-3'>Vaulted Value</div>
              {/* Todo: add dynamic date-joined field */}
              <div className='user-banner_body user-banner_grid-4'>joined June, 2022</div>
              <div className='user-banner_stat-content user-banner_grid-5'>{vaultedItems}</div>
              <div className='user-banner_stat-content user-banner_grid-6'>{formatPrice(vaultedValue)}</div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default UserBanner;
