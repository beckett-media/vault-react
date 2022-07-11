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
  const [confirmedSubmission, setConfirmedSubmission] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  formSubmitted &&
    confirmedSubmission &&
    postSubmission({
      userId: '0123456789',
      description: 'postmanTest',
      title: 'postmanTitle',
      serialNumber: '7327732711',
      category: 'card',
      gradingCompany: 'BGS',
      genre: 'baseball',
      manufacturer: 'faker',
      year: '1999',
      overallGrade: '9.5',
      subGrades: 'corners: 5',
    }).then(
      (res) => res.statusText === 'Created' && setSuccessfulSubmission(true),
    );

  const cancelSubmission = () => setFormSubmitted(false);
  const updateFormSubmitted = () => setFormSubmitted(true);
  const submissionConfirmed = () => setConfirmedSubmission(true);
  const submitAddedItem = (item) => {
    setItems([...items, item]);
    setConfirmedSubmission(true);
  };

  const setOnAdd = () => onAdd(false);
  return (
    <>
      <Container style={{ background: 'black' }}>
        {!confirmedSubmission && !add && (
          <Row className='justify-content-md-center'>
            <SubmissionForm
              items={items}
              formSubmitted={formSubmitted}
              cancelSubmission={cancelSubmission}
              setConfirm={submissionConfirmed}
              onAdd={onAdd}
            />
          </Row>
        )}
        {successfulSubmission && <SubmissionSuccess />}
        {add && (
          <>
            <SubmissionAdd submitAddedItem={submitAddedItem} />
          </>
        )}
        {!confirmedSubmission && !add && items.length !== 0 && (
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
        {!confirmedSubmission && !add && (
          <Row className='m-2'>
            <Col xs={3}>
              <Link to='/market'>
                <SubmitButton
                  func={cancelSubmission}
                  title='Cancel'
                  bg='transparent border'
                />
              </Link>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Submission;
