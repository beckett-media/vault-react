import React from 'react';
import { Link } from 'react-router-dom';
import requireContext from 'require-context.macro';

import './ItemCard.scss';

import { formatPrice } from '../../utils/strings';
const images = requireContext('../../assets/Images', true);

const ItemCard = ({ item, shouldLink = true, belongsToUser }, props) => {
  const link = shouldLink ? `/item/${item.id}` : '';
  const price = item.est_value || item.price;

  const imageUrl =
    item.image_url.startsWith('http://') || item.image_url.startsWith('https://')
      ? item.image_url
      : images(`./${item.image_url}`);

  return (
    <div className={`item-card_component`}>
      <div className='item-card_layout'>
        <Link to={link}>
          <div className='item-card_image-wrapper'>
            <img className='item-card_image' src={imageUrl} alt='' />
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
