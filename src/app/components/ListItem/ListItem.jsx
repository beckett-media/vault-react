import React from 'react';
import { Link } from 'react-router-dom';
import requireContext from 'require-context.macro';

import './ListItem.scss';

import { formatPrice, trimString } from '../../utils/strings';
import { getImageAssetUrl } from '../../utils/image';

const images = requireContext('../../assets/Images', true);

const ListItem = ({ item }, props) => {
  const imageUrl = getImageAssetUrl(item.image_url);

  return (
    <div className='list-item_component'>
      <Link to={`/item/${item.id}`} className='w-100'>
        <div className='list-item_layout'>
          <img className='list-item_image' src={imageUrl} alt='' />
          <div className='ellipses_wrapper'>
            <div className='ellipses_child'>{item.title}</div>
          </div>
          <div className='ellipses_wrapper'>
            <div className='ellipses_child'>{item.description}</div>
          </div>

          <div>{item.grade}</div>
          <div>{formatPrice(+item.est_value)}</div>
        </div>
      </Link>
    </div>
  );
};

export default ListItem;
