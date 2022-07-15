import React from 'react';

import './DisplayImage.scss';

const DisplayImage = ({ image, size }, props) => {
  return (
    <div className={`display-image_wrapper display-image_${size}`}>
      <img src={image} alt='' className='display-image_image' />
    </div>
  );
};

export default DisplayImage;
