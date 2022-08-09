import React, { useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AuthContext } from '../../contexts/auth';
import { getUserName, mapCognitoToUser } from '../../services/user';

import './Submission.scss';

import SubmissionResponse from './SubmissionResponse';
import SubmissionAdd from './SubmissionAdd';
import SubmitButton from '../../components/Generic/SubmitButton';
import SubmissionConfirmModal from './SubmissionConfirmModal';
import UserBanner from '../../components/UserBanner/UserBanner';

import { postSubmission } from '../../services/submission';
import { formatSubmissionItem } from '../../utils/submissions';

const Submission = () => {
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);
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
  const bannerDetails = (<div className='user-banner_content-layout'>
    <div className='user-banner_heading user-banner_grid-1'>{getUserName(userState)}</div>
    {/* Todo: add dynamic date-joined field */}
    <div></div>
    <div></div>
    <div className='user-banner_body user-banner_grid-4'>joined June, 2022</div>
  </div>)
  return (
    <div className='page-wrapper'>
      <div className='h-100 w-100'>
        <UserBanner bannerDetails={bannerDetails}/>
        <section className='section-submission_form'>
          <div className='page-padding'>
            <div className='submission_container'>
              {submissionResponse ? (
                <SubmissionResponse
                  submissionResponse={JSON.stringify(submissionResponse)}
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
