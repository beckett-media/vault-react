import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import SubmitButton from '../Generic/SubmitButton';

const SubmissionForm = ({ onAdd, removeItem, items }) => {
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    setDisplayItems(
      items.map((item, i) => {
        return (
          <Container
            key={item.serialNumber}
            className='m-2 p-3 border border rounded'
          >
            <Row>
              <Col>
                <p>
                  {i + 1}. {item.gradingCompany}
                </p>
              </Col>
              <Col className='right-align'>{item.serialNumber}</Col>
            </Row>
            <Row>
              <Col>{item.description}</Col>
            </Row>
            <SubmitButton
              func={removeItem(item)}
              title='Delete'
              bg='link'
              isLink
            />
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
