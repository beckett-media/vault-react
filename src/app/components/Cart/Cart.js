import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CartItems from './CartItems';
import CartTotal from './CartTotal';

const Cart = () => {
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
