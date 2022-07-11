import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SubmissionSuccess from '../Response/SubmissionSuccess';
import SubmissionAdd from './SubmissionAdd';
import SubmissionForm from './SubmissionForm';
import SubmitButton from '../Generic/SubmitButton';
import './Submission.scss';
import { Link } from 'react-router-dom';
import { postSubmission } from '../../services/submission';

const Submission = () => {
  document.body.classList.add('submit-container');
  const [items, setItems] = useState([]);
  const [add, onAdd] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  const [confirmedSubmission, setConfirmedSubmission] = useState(false);

  const submitAddedItem = (item) => {
    console.log('item', item);
    setItems([...items, item]);
  };

  const removeItem = (removeItem) => {
    setItems(items.filter(item => item != removeItem));
  };

  return (
    <>
      {successfulSubmission ? (
        <SubmissionSuccess />
      ) : (
        <>
          <Container>
              <Row className='justify-content-md-center'>
                <SubmissionForm
                  items={items}
                  formSubmitted={formSubmitted}
                  cancelSubmission={setFormSubmitted(false)}
                  setConfirm={setConfirmedSubmission(true)}
                  removeItem={removeItem}
                  onAdd={onAdd}
                />
              </Row>

            {add && <SubmissionAdd submitAddedItem={submitAddedItem} />}

            {items.length !== 0 && (
              <Row className='m-2'>
                <Col xs={3}>
                  <SubmitButton
                    func={updateFormSubmitted}
                    title='Submit'
                    size='lg'
                  />
                </Col>
              </Row>
            )}

            <Row className='m-2'>
              <Col xs={3}>
                <Link to='/market'>
                  <SubmitButton
                    func={setFormSubmitted(false)}
                    title='Cancel'
                    bg='transparent border'
                  />
                </Link>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Submission;
