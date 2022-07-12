import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SubmissionSuccess from '../Response/SubmissionSuccess';
import SubmissionAdd from './SubmissionAdd';
import SubmissionForm from './SubmissionForm';
import SubmitButton from '../Generic/SubmitButton';
import SubmissionConfirmModal from './SubmissionConfirmModal';
import './Submission.scss';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/user';
import { postSubmission } from '../../services/submission';

const Submission = () => {
  document.body.classList.add('submit-container');
  const [items, setItems] = useState([]);
  const [add, onAdd] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  const [user, setUser] = useState([]);

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

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);
  formSubmitted &&
    confirmedSubmission &&
    postSubmission({
      userName: user.name,
      description: description,
      title: title,
      serialNumber: serialNumber,
      category: category,
      gradingCompany: gradingCompany,
      genre: genre,
      manufacturer: manufacturer,
      year: year,
      overallGrade: overallGrade,
      subGrades: subGrades,
    }).then(
      (res) => res.statusText === 'Created' && setSuccessfulSubmission(true),
    );

  const submitAddedItem = (item) => {
    const newItems = [...items, item];
    console.log('newItems', newItems);
    setItems(newItems);
  };

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

  const submitForm = () => {
    setFormSubmitted(true);
  };

  const submitFinalForm = async () => {
    await postSubmission(items);
    setSuccessfulSubmission(true);
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
                removeItem={removeItem}
                onAdd={onAdd}
              />
            </Row>

            {add && <SubmissionAdd submitAddedItem={submitAddedItem} />}

            {items.length !== 0 && (
              <Row className='m-2'>
                <Col xs={3}>
                  <SubmitButton func={submitForm} title='Submit' size='lg' />
                </Col>
              </Row>
            )}

            <Row className='m-2'>
              <Col xs={3}>
                <Link to='/market'>
                  <SubmitButton
                    func={() => null}
                    title='Cancel'
                    bg='transparent border'
                  />
                </Link>
              </Col>
            </Row>
          </Container>

          <SubmissionConfirmModal
            show={formSubmitted}
            setConfirm={submitFinalForm}
          />
        </>
      )}
    </>
  );
};

export default Submission;
