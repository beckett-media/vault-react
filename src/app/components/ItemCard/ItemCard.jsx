import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, trimString } from '../../utils/strings';

import './ItemCard.scss';

const ItemCard = ({ item }, props) => {
  return (
    <div className={`item-card_component`}>
      <div className='item-card_layout'>
        <Link to={`/item/${item.id}`}>
          <div className='item-card_image-wrapper'>
            <img className='item-card_image' src={item.image_url} alt='' />
          </div>
          <div className='item-card_content-wrapper'>
            <div className='item-card_title'>{trimString(item.title, 20)}</div>
            <div className='item-card_price'>{formatPrice(item.est_value)}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
