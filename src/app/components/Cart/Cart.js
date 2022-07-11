import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CartItems from './CartItems';
import CartTotal from './CartTotal';
import { getUser } from '../../services/user';

const Cart = () => {

  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  const [cart, setCart] = useState({
    items: [
      { id: '1234', title: 'title1', price: '1234.56', img: user.img },
      { id: '2234', title: 'title2', price: '1234.56', img: user.img },
      { id: '3234', title: 'title3', price: '1234.56', img: user.img },
    ],
    total: 0,
  });

  const updateTotal = () =>
    cart.items.reduce(
      (itemsPrevVal, itemsCurVal) =>
        itemsPrevVal + parseFloat(itemsCurVal.price),
      0,
    );

  useEffect(() => {
    setCart({ ...cart, total: updateTotal() });
  }, [cart.items]);
  
  const removeItem = (itemToRemove) => {
    const updatedItems = cart.items.filter((item) => item.id !== itemToRemove)
    console.log(itemToRemove, updatedItems)
    setCart({...cart, items: updatedItems});
  }

  return (
    <Col className='row justify-content-center mb-3 m-5'>
      <Row className='fw-bold fs-2 pt-5'>Shopping Cart</Row>
      <Row className='px-5'>
        <Col xxl={5}>
          <CartItems items={cart.items} removeItem={removeItem}/>
        </Col>
        <Col xxl={5}>
          <CartTotal cart={cart} />
        </Col>
      </Row>
    </Col>
  );
};

export default Cart;
