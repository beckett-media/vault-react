import React from 'react';

const CardActions = () => {
  // some of these actions are if you own the card
  // others are if you don't
  return (
    <select className='form-select-sm mr-3 rounded-pill'>
      <option selected>Actions</option>
      <option>Add to Cart</option>
      <option>Make Offer</option>
      <option>Request Shipment</option>
      <option>Flag Error</option>
      <option>Zoom</option>
      <option>See Back</option>
      <option>Share</option>
    </select>
  );
};

export default CardActions;
