import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CartItems from './CartItems';
import CartTotal from './CartTotal';
import { getUser } from '../../services/user';
import { CartContext } from '../../contexts/cart';

const Cart = () => {
  const cartContext = useContext(CartContext)

  console.log(cartContext)
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);
  return (
    <Col className='row justify-content-center mb-3 m-5'>
      <Row className='fw-bold fs-2 pt-5'>Shopping Cart</Row>
      <Row className='px-5'>
        <Col xxl={5}>
          <CartItems />
        </Col>
        <Col xxl={5}>
          <CartTotal />
        </Col>
      </Row>
    </Col>
  );
};

export default Cart;
