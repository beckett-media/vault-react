import React from 'react';
import { Link } from 'react-router-dom';

import './ItemCard.scss';

import { formatPrice, trimString } from '../../utils/strings';

const ItemCard = ({ item, shouldLink = true, belongsToUser }, props) => {
  const link = shouldLink ? `/item/${item.id}` : '';
  const price = item.est_value || item.price;
  const images = require.context('../../assets/Images', true);
  return (
    <div className={`item-card_component`}>
      <div className='item-card_layout'>
        <Link to={link}>
          <div className='item-card_image-wrapper'>
            <img className='item-card_image' src={images(`./${item.image_url}`)} alt='' />
          </div>
          <div className='item-card_content-wrapper'>
            <div className='item-card_category'>{formatPrice(+price)}</div>
            {!belongsToUser && <div className='item-card_price'>{formatPrice(+price)}</div>}
            <div className='item-card_title ellipses_wrapper'>
              <span className='ellipses_child'>{item.title}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

ItemCard.defaultProps = {
  belongsToUser: false,
};

export default ItemCard;
