import React, { useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import SubmitButton from '../Generic/SubmitButton';
import { FaInfoCircle } from 'react-icons/fa';
import './Cart.scss';
import { useCartContext } from '../../contexts/cart';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const cartContext = useCartContext();
  const [isSelected, setIsSelected] = useState('store');
  const [continueToPayment, setContinueToPayment] = useState(false);
  const navigate = useNavigate();
  const removeItem = async (item) => {
    await cartContext.removeItemFromCart(item);
    navigate('/market');
  };
  return (
    <Col className='pt-5'>
      {cartContext.items?.map((item, i) => {
        return (
          <Row key={item.id} className='mb-3 p-3 border'>
            <Row className='py-2'>
              <Col>
                <Image src={item.img} />
              </Col>
              <Col>
                <p>{item.title}</p>
              </Col>
              <Col className='pb-3 right-align'>
                <p>${item.price}</p>
              </Col>
              <hr />
            </Row>
            <Row className='p-2'>
              <Col>
                <Button id={item.id} onClick={() => removeItem(item)} variant='link'>
                  Remove
                </Button>
              </Col>
            </Row>
          </Row>
        );
      })}
      {cartContext.proceedToCheckout === true && !continueToPayment && (
        <Row className='px-5 py-3 pb-4 border'>
          <div>
            <div className='fs-4 py-2 fw-bold'>Card Storage</div>
            <Form.Check
              type='radio'
              className='pb-3'
              id='store'
              checked={isSelected === 'store'}
              onChange={() => setIsSelected('store')}
              label='Beckett Vault (Nifty benefit, cool benefit, awesome benefit)'
            />
            <Form.Check
              type='radio'
              className='pb-3'
              id='withdraw'
              checked={isSelected === 'withdraw'}
              onChange={() => setIsSelected('withdraw')}
              label='Remove from Beckett Vault ($35 removal fee, + shipping fee)'
            />
          </div>
          {!continueToPayment && isSelected === 'withdraw' && (
            <Row>
              <hr />
              <div className='pt-4 fs-4 fw-bold'>Shipping Address</div>
              <Form.Label className='p-2'>First Name</Form.Label>
              <Form.Control type='input' />
              <Form.Label className='p-2'>Last Name</Form.Label>
              <Form.Control type='input' />
              <Form.Label className='p-2'>Country/Region</Form.Label>
              <Form.Control type='input' />
              <Form.Label className='p-2'>Address</Form.Label>
              <Form.Control type='input' />
              <Form.Control type='input' />
              <Form.Label className='p-2'>City</Form.Label>
              <Form.Control type='input' />
              <Form.Label className='p-2'>State</Form.Label>
              <Form.Control type='input' />
              <Form.Label className='p-2'>Zip code</Form.Label>
              <Form.Control type='input' className='mb-4' />
            </Row>
          )}
          <Row>
            <SubmitButton func={setContinueToPayment} title='Continue' />
          </Row>
        </Row>
      )}

      {continueToPayment && (
        <Row className='px-5 py-3 pb-4 border'>
          <div className='fs-4 py-2 fw-bold'>Payment Method</div>
          <Form.Label className='p-2'>Card Number</Form.Label>
          <Form.Control type='input' />
          <Form.Label className='p-2'>Card Name</Form.Label>
          <Form.Control type='input' />
          <Form.Label className='p-2'>Expiration</Form.Label>
          <Form.Control type='input' />
          <Form.Label className='p-2'>
            CVV <FaInfoCircle />
          </Form.Label>
          <Form.Control type='input' className='mb-4' />
          <Row>
            <SubmitButton func={setContinueToPayment} title='Continue' />
          </Row>
        </Row>
      )}
    </Col>
  );
};

export default CartItems;
