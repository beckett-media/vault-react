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

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  const submitAddedItem = (item) => {
    const newItems = [...items, item];
    console.log('newItems', newItems);
    setItems(newItems);
  };

  const removeItem = (removedItem) => {
    setItems(items.filter((item) => item != removedItem));
  };

  const submitForm = () => {
    setFormSubmitted(true);
  };

  const handleSubmitForm = async () => {
    if (formSubmitted) {
      Promise.allSettled(items.map((item) => postSubmission({
        user: user.name,
        description: item.description,
        grading_company: item.gradingCompany,
        serial_number: item.serialNumber,
        title: item.title,
        description: item.description,
        genre: item.genre,
        manufacturer: item.manufacturer,
        year: item.year,
        overall_grade: item.overallGrade,
        sub_grades: item.subGrades,
        autograph: item.autoGraph,
        subject: item.subject,
        est_value: item.estimatedValue,
        image_base64: item.imageBase64.split(`data:${item.imageFormat};base64,`)[1],
        image_format: item.imageFormat,
      }))).then((resp) => {
        console.log('resp', resp);
        setSuccessfulSubmission(true);
      }).catch((e) => {
        // TODO
        console.error(e);
        alert('there was an error');
      });
    }
  };

  const submitFinalForm = async () => {
    await handleSubmitForm(items);
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
