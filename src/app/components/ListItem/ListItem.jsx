import React from 'react';
import { Link } from 'react-router-dom';

import './ListItem.scss';

import { trimString, formatPrice } from '../../utils/strings';

const images = require.context('../../assets/Images', true);

const ListItem = ({ item }, props) => {
  return (
    <div className='list-item_component'>
      <Link to={`/item/${item.id}`} className='w-100'>
        <div className='list-item_layout'>
          <img className='list-item_image' src={images(`./${item.image_url}`)} alt='' />
          <div>{trimString(item.title, 20)}</div>
          <div>{trimString(item.description, 50)}</div>
          <div className='text-end'>{item.grade}</div>
          <div className='text-end'>{formatPrice(+item.est_value)}</div>
        </div>
      </Link>
    </div>
  );
};

export default ListItem;
