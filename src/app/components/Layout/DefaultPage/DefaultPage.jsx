import React from 'react';

import UserBanner from '../../UserBanner/UserBanner';

const DefaultPage = ({ hasBannerStats, children }) => {
  return (
    <div className='w-100 h-100'>
      <UserBanner />
      <div className='w-100 h-100 bg-light text-body'>{children}</div>
    </div>
  );
};

export default DefaultPage;
