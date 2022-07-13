import React, { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { CartContext, proceedToCheckoutToggle, useCartContext } from '../../contexts/cart';
import SubmitButton from '../Generic/SubmitButton';
import './Cart.scss'

const CartTotal = () => {
  const cartContext = useCartContext()
  const tax = 12.00
  return (
    <Col className='m-5 border border'>
      <Row className='pt-5 px-5'>
        <Col sm={9}>Subtotal {`( ${cartContext.cartObject.items.length} items )`}</Col>
        <Col className='align-right'>${cartContext.cartObject.total}</Col>
      </Row>
      <Row className='py-3 px-5'>
        <Col sm={9}>Estimated Taxes</Col>
        <Col className='align-right'>${tax.toLocaleString()}</Col>
      </Row>
      <hr/>
      <Row className='pb-5 pt-3 px-5 fw-bold fs-4'>
        <Col sm={7}>Estimated Total</Col>
        <Col className='align-right'>${cartContext.cartObject.total + tax}</Col>
      </Row>
      { !cartContext.proceedToCheckout &&
        <Row className='pb-5 px-5 fw-bold row justify-content-center'>
          <Button onClick={() => cartContext. proceedToCheckoutToggle()}>Continue to checkout</Button>
        </Row>
      }
    </Col>
  );
};

export default CartTotal;
