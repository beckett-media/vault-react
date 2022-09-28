import React from 'react';

import './DefaultPage.scss';

import UserBanner from '../../UserBanner/UserBanner';

const DefaultPage = ({ hasBannerStats, children }) => {
  return (
    <div className='w-100 h-100'>
      <UserBanner />
      <div className='w-100 h-100 bg-white text-body default-page_content'>{children}</div>
    </div>
  );
};

export default DefaultPage;
