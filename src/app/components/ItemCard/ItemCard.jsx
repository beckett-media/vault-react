import React from 'react';
import { Link } from 'react-router-dom';
import requireContext from 'require-context.macro';
import { formatPrice, trimString } from '../../utils/strings';
import './ItemCard.scss';

const ItemCard = ({ item, shouldLink = true }, props) => {
  const link = shouldLink ? `/item/${item.id}` : '';
  const price = item.est_value || item.price;
  const images = requireContext('../../assets/Images', true);
  return (
    <div className={`item-card_component`}>
      <div className='item-card_layout'>
        <Link to={link}>
          <div className='item-card_image-wrapper'>
            <img className='item-card_image' src={images(`./${item.image_url}`)} alt='' />
          </div>
          <div className='item-card_content-wrapper'>
            <div className='item-card_title'>{trimString(item.title, 20)}</div>
            <div className='item-card_price'>{formatPrice(+price)}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
