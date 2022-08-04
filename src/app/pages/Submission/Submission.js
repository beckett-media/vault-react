import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import './Submission.scss';

import SubmissionResponse from './SubmissionResponse';
import SubmissionAdd from './SubmissionAdd';
import SubmitButton from '../../components/Generic/SubmitButton';
import SubmissionConfirmModal from './SubmissionConfirmModal';
import UserBanner from '../../components/UserBanner/UserBanner';

import { postSubmission } from '../../services/submission';
import { formatSubmissionItem } from '../../utils/submissions';

const Submission = () => {
  const [items, setItems] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState(null);

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
          setSubmissionResponse(resp);
        })
        .catch((e) => {
          // TODO
          console.error(e);
          setSubmissionResponse(e);
        });
    }
  };

  const submitFinalForm = async () => {
    await handleSubmitForm(items);
  };

  return (
    <div className='page-wrapper'>
      <div className='h-100 w-100'>
        <UserBanner />
        <section className='section-submission_form'>
          <div className='page-padding'>
            <div className='submission_container'>
              {submissionResponse ? (
                <SubmissionResponse
                  submissionResponse={submissionResponse}
                  setSubmissionResponse={setSubmissionResponse}
                />
              ) : (
                <>
                  <SubmissionAdd submitAddedItem={submitAddedItem} />

                  {items.length !== 0 && (
                    <Row className='m-2'>
                      <Col xs={3}>
                        <SubmitButton func={submitForm} title='Submit' size='lg' />
                      </Col>
                    </Row>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <SubmissionConfirmModal show={formSubmitted} setConfirm={submitFinalForm} />
      </div>
    </div>
  );
};

export default Submission;
