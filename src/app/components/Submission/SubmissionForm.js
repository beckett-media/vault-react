import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { CartContext } from '../../contexts/cart';
import SubmitButton from '../Generic/SubmitButton';

const SubmissionForm = ({ onAdd, items }) => {
  const [displayItems, setDisplayItems] = useState([]);
  const cartContext = useContext(CartContext)
  console.log(cartContext)
  const removeItem = () => console.log()
  useEffect(() => {
    setDisplayItems(
      items.map((item, i) => {
        return (
          <Container key={item.id} className='m-2 p-3 border border rounded'>
            <Row>
              <Col className='info-box'>
                <p>
                  {i + 1}. {obj.gradingCompany}
                </p>
              </Col>
              <Col className='right-align'>{obj.serialNumber}</Col>
            </Row>
            <Row>
              <Col>{obj.description}</Col>
            </Row>
            <SubmitButton func={removeItem} title='Delete' bg='link' isLink />
          </Container>
        );
      }),
    );
  }, [items]);
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>Submission Form</h1>
      </Row>
      <Row className='justify-content-md-center'>
        <div>{items.length ? 'Items to Vault' : 'Add Items to Vault'}</div>
      </Row>
      <Form>
        {displayItems}
        <Row className='m-2'>
          <Col xs={3}>
            <SubmitButton
              func={() => onAdd(true)}
              title={items.length ? 'Add another item' : 'Add an item'}
              size='lg'
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SubmissionForm;
