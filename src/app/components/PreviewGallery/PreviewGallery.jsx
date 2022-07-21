import React from 'react';
import { Link } from 'react-router-dom';

import ItemCard from '../ItemCard/ItemCard';

import './PreviewGallery.scss';

const PreviewGallery = ({ data, title, link }, props) => {
  return (
    <div className='preview-gallery_component'>
      <div className='preview-gallery_layout'>
        <div className='preview-gallery_text-wrapper'>
          <div className='preview-gallery_heading'>{title}</div>
          {link && (
            <div className='preview-gallery_link-wrapper'>
              <Link to={link}>See more</Link>
            </div>
          )}
        </div>
        <div className='preview-gallery_gallery-wrapper'>
          {data?.slice(0, 4).map((item, index) => (
            <ItemCard item={item} key={'preview-gallery_' + index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewGallery;
