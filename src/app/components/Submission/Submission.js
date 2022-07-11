import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SubmissionSuccess from '../Response/SubmissionSuccess';
import SubmissionAdd from './SubmissionAdd';
import SubmissionForm from './SubmissionForm';
import SubmitButton from '../Generic/SubmitButton';
import './Submission.scss';
import { Link } from 'react-router-dom';
import {postSubmission} from '../../services/submission'

const Submission = () => {
  document.body.classList.add('submit-container');
  const [items, setItems] = useState([]);
  const [add, onAdd] = useState(false);
  const [completeAdd, toggleCompleteAdd] = useState(false);
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
  const confirmAdd = () => onAdd(false);
  const submitAddedItem = () => {
    confirmAdd();
    toggleCompleteAdd(!completeAdd);
  };
  // Sorry for many state variables, they are strictly local.
  const [gradingCompany, setGradingCompany] = useState('');
  const [category, setCategory] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [description, setDescription] = useState('');
  // Below are optional
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [year, setYear] = useState('');
  const [overallGrade, setOverallGrade] = useState('');
  const [subGrades, setSubGrades] = useState('');
  const [autographGrade, setAutographGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [image, setImage] = useState('');
  const values = {
    gradingCompany,
    category,
    serialNumber,
    description,
    title,
    genre,
    manufacturer,
    year,
    overallGrade,
    subGrades,
    autographGrade,
    subject,
    image,
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
            <Row className='m-2'>
              <Col xs={12}>
                <SubmissionAdd values={values} />
              </Col>
            </Row>
            <Row className='mx-4 my-2'>
              <Col xs={2}>
                <SubmitButton func={submitAddedItem} title='Next' size='lg' />
              </Col>
            </Row>
            <Row className='mx-4 my-2'>
              <Col xs={2}>
                <SubmitButton func={setOnAdd} title='Cancel' bg='transparent' />
              </Col>
            </Row>
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
