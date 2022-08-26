import React from 'react';
import { Link } from 'react-router-dom';

import './ItemCard.scss';

import { getImageAssetUrl } from '../../utils/image';
import { formatPrice } from '../../utils/strings';
import { ReactComponent as EmptyImage } from '../../assets/beckett-card-placeholder--gray.svg';

const ItemCard = ({ item, shouldLink = true, belongsToUser }, props) => {
  const link = shouldLink ? `/my-collection/item/${item.id}` : '';
  const price = item.est_value || item.price;

  const imageUrl = getImageAssetUrl(item.image_url);

  return (
    <div className={`item-card_component`}>
      <div className='item-card_layout'>
        <Link to={link}>
          <div className='item-card_image-wrapper'>
            {imageUrl ? (
              <img className='item-card_image' src={imageUrl} alt='' />
            ) : (
              <EmptyImage className='item-card_image' />
            )}
          </div>
          <div className='item-card_content-wrapper'>
            <div className='item-card_category'>
              {item.title || item.year + ' ' + item.manufacturer + ' ' + item.card_number + ' ' + item.player}
            </div>
            {!belongsToUser && <div className='item-card_price'>{formatPrice(+price)}</div>}
            {/* <div className='item-card_title ellipses_wrapper'>
              <span className='ellipses_child'>{item.title}</span>
            </div> */}
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
