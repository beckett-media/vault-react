import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Cart.scss'

const CartTotal = (props) => {
  const tax = 12.00
  return (
      <Col className='m-5 border border'>
        <Row className='pt-5 px-5'>
          <Col sm={9}>Subtotal {`( ${props.cart.items.length} items )`}</Col>
          <Col className='align-right'>${props.cart.total}</Col>
        </Row>
        <Row className='py-3 px-5'>
          <Col sm={9}>Estimated Taxes</Col>
          <Col className='align-right'>${tax.toLocaleString()}</Col>
        </Row>
        <hr/>
        <Row className='pb-5 pt-3 px-5 fw-bold fs-4 '>
          <Col sm={7}>Estimated Total</Col>
          <Col className='align-right'>${props.cart.total + tax}</Col>
        </Row>
        <Row>
          <SubmitButton title='Continue to checkout'/>
        </Row>
      </Col>
  );
};

export default CartTotal;
