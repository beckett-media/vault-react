import React from 'react';

import './ComingSoon.scss';

const ComingSoon = () => {
  return (
    <div className='page-wrapper'>
      <div className='coming-soon_component'>
        {/* <div className='coming-soon_background-wrapper'>
          <div className='coming-soon_background-image-wrapper'>
            <img
              src={require('../../assets/coming-soon--min.jpeg')}
              alt='galaxy image'
              className='coming-soon_background-image'
            ></img>
          </div>
          <div className='coming-soon_background-overlay'></div>
        </div> */}
        <div className='coming-soon_content-wrapper'>
          <div className='coming-soon_heading'>Coming Soon</div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
