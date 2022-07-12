import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SubmitButton from '../Generic/SubmitButton';
import './Cart.scss'

const CartTotal = (props) => {
  const { cart, proceedToCheckoutToggle } = props;
  
  const tax = 12.00
  return (
      <Col className='m-5 border border'>
        <Row className='pt-5 px-5'>
          <Col sm={9}>Subtotal {`( ${cart.items.length} items )`}</Col>
          <Col className='align-right'>${cart.total}</Col>
        </Row>
        <Row className='py-3 px-5'>
          <Col sm={9}>Estimated Taxes</Col>
          <Col className='align-right'>${tax.toLocaleString()}</Col>
        </Row>
        <hr/>
        <Row className='pb-5 pt-3 px-5 fw-bold fs-4'>
          <Col sm={7}>Estimated Total</Col>
          <Col className='align-right'>${cart.total + tax}</Col>
        </Row>
        { !cart.proceedToCheckout &&
          <Row className='pb-5 px-5 fw-bold row justify-content-center'>
            <SubmitButton title='Continue to checkout' func={proceedToCheckoutToggle} bg='primary'/>
          </Row>
        }
      </Col>
  );
};

export default CartTotal;
