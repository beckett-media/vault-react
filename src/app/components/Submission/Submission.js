import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import SubmissionSuccess from '../Response/SubmissionSuccess';
import SubmissionAdd from './SubmissionAdd';
import SubmissionForm from './SubmissionForm';
import SubmitButton from '../Generic/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { submissionFormSelector } from '../../state/selectors';
import { addSubmissionItem } from '../../state/actions';
import { postSubmission } from '../../services/submission';

const Submission = () => {
  const items = useSelector(submissionFormSelector).items;
  const dispatch = useDispatch();
  const [add, onAdd] = useState(false);
  const [completeAdd, toggleCompleteAdd] = useState(false);
  const [confirmedSubmission, setConfirmedSubmission] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  formSubmitted && confirmedSubmission &&
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
    });

  const cancelSubmission = () => setFormSubmitted(false);
  const updateFormSubmitted = () => setFormSubmitted(true);
  const submissionConfirmed = () => setConfirmedSubmission(true);
  const confirmAdd = () => onAdd(false);
  const submitAddedItem = () => {
    confirmAdd();
    toggleCompleteAdd(!completeAdd);
    dispatch(addSubmissionItem(values));
    Object.values(stateSetters).forEach((setter) => setter(''));
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
  const stateSetters = {
    setGradingCompany,
    setCategory,
    setSerialNumber,
    setDescription,
    setTitle,
    setGenre,
    setManufacturer,
    setYear,
    setOverallGrade,
    setSubGrades,
    setAutographGrade,
    setSubject,
    setImage,
  };

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
            <SubmitButton func={updateFormSubmitted} title='Submit' />
          </Row>
        )}
        {confirmedSubmission && <SubmissionSuccess />}
        {add && (
          <>
            <Row className='justify-content-md-center'>
              <SubmissionAdd values={values} stateSetters={stateSetters} />
            </Row>
            <Row className='justify-content-md-center'>
              <SubmitButton func={submitAddedItem} title='Add' />
              <Button onClick={() => onAdd(false)}>Cancel</Button>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Submission;
