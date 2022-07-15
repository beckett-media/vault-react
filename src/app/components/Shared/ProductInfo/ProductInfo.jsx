import React from 'react';
import { Button } from 'react-bootstrap';

import './ProductInfo.scss';

import { formatPrice } from '../../../utils/strings';

const ProductInfo = ({ isOwner, item, addToCart }, props) => {
  return (
    <div className='product-info_component'>
      <div className='product-info_title'>{item.title}</div>
      <div className='product-info_stats'>
        <div>{formatPrice(item.price)}</div>
        <div>{item.grade ? item.grade : 'Beckett 10'}</div>
      </div>
      {item.tags && (
        <div className='product-info_tags-wrapper'>
          {item.tags.map((tag, index) => (
            <div className='tag_component' key={index}>
              {tag}
            </div>
          ))}
        </div>
      )}
      <div className='product-info_buttons-wrapper'>
        {isOwner ? (
          <>
            <Button className='w-100' onClick={() => addToCart()}>
              Sell in Marketplace
            </Button>
            <Button className='w-100' variant='outline-dark' onClick={() => addToCart()}>
              Edit Card Details
            </Button>
            <Button className='text-start text-decoration-none' variant='link'>
              Remove From Beckett Vault
            </Button>
          </>
        ) : (
          <>
            <Button className='w-100' onClick={() => addToCart()}>
              Buy Now
            </Button>
            <Button className='w-100' variant='outline-dark' onClick={() => addToCart()}>
              Add To Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
