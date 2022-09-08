import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ItemCard.scss';

import StatusTracker from '../StatusTracker/StatusTracker';

import { getImageAssetUrl } from '../../utils/image';
import { formatPrice } from '../../utils/strings';
import { ReactComponent as EmptyImage } from '../../assets/beckett-card-placeholder--gray.svg';
import { SUBMISSION_STATUS } from '../../services/submission';
import { getTitle } from '../../utils/vaulting';

const ItemCard = ({ item, shouldLink = true, belongsToUser }, props) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const link = shouldLink ? `/my-collection/item/${item.id}` : '';
  const price = item.est_value || item.price;

  const imageUrl = getImageAssetUrl(item.image_url);

  const isVaulted = item.status === SUBMISSION_STATUS.Vaulted;

  const convertStatusToSteps = (status) => {
    if (status === 1) {
      return 1;
    } else if (status === 2) {
      return 2;
    } else if (status === 4) {
      return 3;
    } else if (status === 5) {
      return 4;
    } else if (status === 3) {
      return 0;
    } else {
      return null;
    }
  };

  const cardNumber = item.card_number ? '#' + item.card_number : '';
  return (
    <div className={`item-card_component`}>
      <div className='item-card_layout'>
        <Link to={isVaulted ? link : '/my-collection'}>
          <div className='item-card_image-wrapper'>
            {!isVaulted && (
              <div className='item-card_pending-overlay'>
                <div className='mb-1'>Status: {item.status_desc ? item.status_desc : 'Error retrieving status'}</div>
                <StatusTracker totalSteps={4} currentStep={convertStatusToSteps(item.status)}></StatusTracker>
              </div>
            )}
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
            <div className='item-card_category'>{getTitle(item, 'submission')}</div>
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
