import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import '../../../index.scss';
import SubmitButton from '../Generic/SubmitButton';
import SubmissionConfirmModal from './SubmissionConfirmModal';

const SubmissionForm = ({
  formSubmitted,
  setConfirm,
  cancelSubmission,
  onAdd,
  items,
}) => {
  const onAddNew = () => onAdd(true);

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>Submission Form</h1>
      </Row>
      <Row className='justify-content-md-center'>
        <div>{items.length ? 'Items to Vault' : 'Add Items to Vault'}</div>
      </Row>
      <Row className='justify-content-md-center'>
        <SubmissionConfirmModal
          show={formSubmitted}
          setConfirm={setConfirm}
          onHide={cancelSubmission}
        />
      </Row>
      <Form>
        {items.map((obj, i) => {
          return (
            <Container key={obj.id} className='m-2 p-3 border border rounded'>
              <Row>
                <Col>
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
        })}
        <Row className='m-2'>
          <Col xs={3}>
            <SubmitButton
              func={onAddNew}
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
