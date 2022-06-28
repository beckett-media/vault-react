import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className='row justify-content-center mb-3'>
      Your cart is Empty, go <Link to='/market'> Buy Stuff </Link>
    </div>
  );
};

export default Cart;
