import React from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';

const CartItems = (props) => {
  const { items, removeItem } = props;
  return (
    <Col className='pt-5'>
      {items.map((item, i) => {
        return (
          <Row key={item.id} className='mb-3 p-3 border'>
            <Row className='py-2'>
              <Col>
                <Image src={item.img} />
              </Col>
              <Col>
                <p>{item.title}</p>
              </Col>
              <Col className='pb-3'>
                <p>${item.price}</p>
              </Col>
              <hr/>
            </Row>
            <Row className='p-2'>
              <Col>
                <Button id={item.id} onClick={(e) => removeItem(e.target.id)} variant='link'>Remove</Button>
              </Col>
            </Row>
          </Row>
        );
      })}
    </Col>
  );
};

export default CartItems;
