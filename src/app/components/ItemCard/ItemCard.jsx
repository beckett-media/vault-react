import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trimString, formatPrice } from '../../utils/strings';
import { getItem } from '../../services/items';

import './ItemCard.scss';

const ItemCard = ({ data }, props) => {
  const [defaultItem, setDefaultItem] = useState({});

  console.log(defaultItem);

  useEffect(() => {
    getItem().then((data) => setDefaultItem(data));
  }, []);

  return (
    <div className={`item-card_component`}>
      <div className='item-card_layout'>
        <Link to={`/item/${data.id}`}>
          <div className='item-card_image-wrapper'>
            <img className='item-card_image' src={data.img} alt='' />
          </div>
          <div className='item-card_content-wrapper'>
            <div className='item-card_title'>{trimString(data.title, 20)}</div>
            <div className='item-card_price'>{formatPrice(data.price)}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

ItemCard.defaultProps = {
  data: defaultItem,
};

export default ItemCard;
