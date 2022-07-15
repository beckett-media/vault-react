import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import SubmitButton from '../../components/Generic/SubmitButton';

const SubmissionForm = ({ onAdd, removeItem, items }) => {
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    setDisplayItems(
      items.map((item, i) => {
        return (
          <Container key={i} className='m-2 p-3 border border rounded'>
            <Row>
              <Col sm={12} lg={3}>
                {item.previewUrl && item.imageBase64 ? <img src={item.previewUrl} alt='preview' /> : null}
              </Col>
              <Col sm={12} lg={9}>
                <Row>
                  <Col className='info-box'>
                    <p>
                      {i + 1}. {item.genre} - {item.title}
                    </p>
                  </Col>
                  <Col className='right-align'>{item.manufacturer}</Col>
                </Row>
                <Row>
                  <p>{item.description}</p>
                  <p>{`Company: ${item.company}, Serial number: ${item.serialNumber}`}</p>
                  <p>{`Year: ${item.year}, Estimated value: $${item.estimatedValue}`}</p>
                  <p>{`Overall grade: ${item.overallGrade}, Sub grades: ${item.subGrades}`}</p>
                  <p>{`Autograph: ${item.autoGraph}, Subgraph: ${item.subgraph}`}</p>
                </Row>
                <SubmitButton func={() => removeItem(item)} title='Delete' bg='link' isLink />
              </Col>
            </Row>
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
