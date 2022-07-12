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
  formSubmitted &&
    confirmedSubmission &&
    postSubmission({
      ...item,
      userName: user.name,
    }).then(
      (res) => res.statusText === 'Created' && setSuccessfulSubmission(true),
    );

  const submitAddedItem = (item) => {
    const newItems = [...items, item];
    console.log('newItems', newItems);
    setItems(newItems);
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
