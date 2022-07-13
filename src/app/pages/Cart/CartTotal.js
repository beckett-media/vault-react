import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../contexts/cart';
import './Cart.scss';

const CartTotal = () => {
  const cartContext = useCartContext();
  const navigate = useNavigate();
  const tax = cartContext.items.length ? 12.0 : 0.0;
  const backToMarketplace = () => navigate('/Market');
  const proceedToCheckout = () => cartContext.proceedToCheckoutToggle();
  return (
    <Col className='m-5 border border'>
      <Row className='pt-5 px-5'>
        <Col sm={9}>Subtotal {`( ${cartContext.items.length} items )`}</Col>
        <Col className='align-right'>${cartContext.total.toFixed(2)}</Col>
      </Row>
      <Row className='py-3 px-5'>
        <Col sm={9}>Estimated Taxes</Col>
        <Col className='align-right'>${tax.toFixed(2).toLocaleString()}</Col>
      </Row>
      <hr />
      <Row className='pb-5 pt-3 px-5 fw-bold fs-4'>
        <Col sm={7}>Estimated Total</Col>
        <Col className='align-right'>${parseFloat(cartContext.total + tax).toFixed(2)}</Col>
      </Row>
      {!cartContext.proceedToCheckout && cartContext.items.length !== 0 && (
        <Row className='pb-5 px-5 fw-bold row justify-content-center'>
          <Button onClick={() => proceedToCheckout()}>Continue to checkout</Button>
        </Row>
      )}
      {!cartContext.items.length && (
        <Row className='pb-5 px-5 fw-bold row justify-content-center'>
          <Button onClick={() => backToMarketplace()}>Go to marketplace</Button>
        </Row>
      )}
    </Col>
  );
};

export default CartTotal;
