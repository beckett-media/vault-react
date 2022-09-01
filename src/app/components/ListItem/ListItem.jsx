import React from 'react';
import { Link } from 'react-router-dom';
import requireContext from 'require-context.macro';

import './ListItem.scss';

import { formatPrice, trimString } from '../../utils/strings';
import { getImageAssetUrl } from '../../utils/image';
import { ReactComponent as EmptyCollection } from '../../assets/beckett-card-placeholder.svg';

const images = requireContext('../../assets/Images', true);

const ListItem = ({ item }) => {
  const imageUrl = getImageAssetUrl(item.image_url);

  return (
    <div className='list-item_component'>
      <Link to={`/my-collection/item/${item.id}`} className='w-100'>
        <div className='list-item_layout'>
          {item.image_url ? (
            <img className='list-item_image' src={imageUrl} alt='' />
          ) : (
            <EmptyCollection className='list-item_image' />
          )}
          <div className='ellipses_wrapper'>
            <div className='ellipses_child'>
              {item.type === 1 && item.year + ' ' + item.set_name + ' ' + item.card_number + ' ' + item.player}
              {item.type === 2 && item.title + ' ' + item.issue + ' ' + item.publisher + ' ' + item.year}
            </div>
          </div>
          <div className='ellipses_wrapper list-item_description'>
            <div className='ellipses_child'>{item.description?.length && item.description}</div>
          </div>

          <div>{!isNaN(item.grade) ? item.grade : ''}</div>
          <div>{formatPrice(+item.est_value)}</div>
        </div>
      </Link>
    </div>
  );
};

export default ListItem;
