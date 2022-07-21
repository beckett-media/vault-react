import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import './ItemGallery.scss';
import ItemCard from '../ItemCard/ItemCard';

const ItemGallery = ({ data, isInfinite }, props) => {
  const [itemCountLimit, setItemCountLimit] = useState(isInfinite ? 8 : 16);

  const filteredData = data.slice(0, itemCountLimit);

  function increaseItemCount() {
    setItemCountLimit(itemCountLimit + 4);
  }

  return (
    <div className='item-gallery_component'>
      <div className='item-gallery_grid-wrapper'>
        {filteredData.map((item, index) => (
          <ItemCard item={item} key={'item-gallery_' + index} />
        ))}
      </div>
      {isInfinite && (
        <div className='item-gallery_button-wrapper'>
          <Button variant='outline-primary' onClick={increaseItemCount}>
            See More
          </Button>
        </div>
      )}
    </div>
  );
};

ItemGallery.defaultProps = {
  isInfinite: false,
};

export default ItemGallery;
