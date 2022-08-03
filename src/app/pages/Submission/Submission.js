import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import './Submission.scss';

import SubmissionSuccess from '../Response/SubmissionSuccess';
import SubmissionAdd from './SubmissionAdd';
import SubmitButton from '../../components/Generic/SubmitButton';
import SubmissionConfirmModal from './SubmissionConfirmModal';
import UserBanner from '../../components/UserBanner/UserBanner';

import { postSubmission } from '../../services/submission';
import { formatSubmissionItem } from '../../utils/submissions';

const Submission = () => {
  const [items, setItems] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const submitAddedItem = (item) => {
    const newItems = [...items, item];
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
      Promise.allSettled(
        items.map((item) =>
          postSubmission({
            ...formatSubmissionItem(item),
            user: userState.sub,
          }),
        ),
      )
        .then((resp) => {
          setSuccessfulSubmission(true);
        })
        .catch((e) => {
          // TODO
          console.error(e);
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
        <div className='h-100'>
          <UserBanner />
          <section className='section-submission_form'>
            <div className='page-padding'>
              <div className='submission_container'>
                <SubmissionAdd submitAddedItem={submitAddedItem} />

                {items.length !== 0 && (
                  <Row className='m-2'>
                    <Col xs={3}>
                      <SubmitButton func={submitForm} title='Submit' size='lg' />
                    </Col>
                  </Row>
                )}
              </div>
            </div>
          </section>

          <SubmissionConfirmModal show={formSubmitted} setConfirm={submitFinalForm} />
        </div>
      )}
    </>
  );
};

export default Submission;
