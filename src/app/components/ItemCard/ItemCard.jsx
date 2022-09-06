import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import './ItemCard.scss';

import { getImageAssetUrl } from '../../utils/image';
import { formatPrice } from '../../utils/strings';
import { ReactComponent as EmptyImage } from '../../assets/beckett-card-placeholder--gray.svg';

const ItemCard = ({ item, shouldLink = true, belongsToUser }, props) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const link = shouldLink ? `/my-collection/item/${item.id}` : '';
  const price = item.est_value || item.price;

  const imageUrl = getImageAssetUrl(item.image_url);

  const cardNumber = item.card_number ? '#' + item.card_number : '';
  return (
    <div className={`item-card_component`}>
      <div className='item-card_layout'>
        <Link to={link}>
          <div className='item-card_image-wrapper'>
            {imageUrl ? (
              <>
                <Spinner
                  animation='border'
                  role='status'
                  className={`item-card_spinner ${!isImageLoading && 'd-none'}`}
                >
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
                <img
                  className={`item-card_image ${isImageLoading && 'd-none'}`}
                  src={imageUrl}
                  alt=''
                  onLoad={() => setIsImageLoading(false)}
                />
              </>
            ) : (
              <EmptyImage className='item-card_image' />
            )}
          </div>
          <div className='item-card_content-wrapper'>
            <div className='item-card_category'>
              {item.item_type === 1 && item.year + ' ' + item.set_name + ' ' + cardNumber + ' ' + item.player}
              {item.item_type === 2 && item.title + ' ' + item.issue + ' ' + item.publisher + ' ' + item.year}
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
