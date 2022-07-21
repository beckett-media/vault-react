import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './SuggestedPurchases.scss';

import { formatPrice } from '../../utils/strings';

const SuggestedPurchases = ({ isOwner, data, addToCart }, props) => {
  return (
    <div className='suggested-purchases_component'>
      <div className='suggested-purchases_title'>Other sellers on Beckett</div>
      <div className='suggested-purchases_items-wrapper'>
        {data?.slice(0, 4)?.map((item, index) => (
          <>
            <div className='divider--grey'></div>
            <div className='suggested-purchase_component' key={'suggested-purchases_' + index}>
              <div className='suggested-purchase_content-wrapper'>
                <Link to={`/item/${item.id}`}>
                  <div className='suggested-purchase_title ellipses_wrapper'>
                    <span className='ellipses_child'>{formatPrice(item.price) + ' - ' + item.title}</span>
                  </div>
                </Link>
                <div className='suggested-purchase_price'>Sold by: {item?.owner}</div>
              </div>
              {isOwner || (
                <div className='suggested-purchase_button-wrapper'>
                  <Button className='w-100 h-100' onClick={() => addToCart()}>
                    Add To Cart
                  </Button>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPurchases;
