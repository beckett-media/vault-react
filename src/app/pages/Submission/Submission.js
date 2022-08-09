import React, { useState, useContext } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { AuthContext } from '../../contexts/auth';
import { mapCognitoToUser } from '../../services/user';

import './Submission.scss';

import SubmissionResponse from './SubmissionResponse';
import SubmissionAdd from './SubmissionAdd';
import SubmitButton from '../../components/Generic/SubmitButton';
import SubmissionConfirmModal from './SubmissionConfirmModal';
import UserBanner from '../../components/UserBanner/UserBanner';
import ListItem from '../../components/ListItem/ListItem';

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
    console.log(items);
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
            <div className='container-large'>
              <div className='submission_layout'>
                {submissionResponse ? (
                  <div className='submission_container'>
                    <SubmissionResponse
                      submissionResponse={JSON.stringify(submissionResponse)}
                      setSubmissionResponse={setSubmissionResponse}
                    />
                  </div>
                ) : (
                  <>
                    <div className='submission_container'>
                      <SubmissionAdd submitAddedItem={submitAddedItem} />
                    </div>

                    {items.length !== 0 && (
                      <>
                        <div className='submission_container mt-4'>
                          <div className='submission_heading'>My items to submit</div>
                        </div>
                        <div className='submission_items'>
                          {items.map((item, index) => (
                            <div key={`submission_${index}`} className='submission-item_component'>
                              <div className='submission-item_layout'>
                                <div className='ellipses_wrapper'>
                                  <div className='ellipses_child'>{item.year}</div>
                                </div>
                                <div className='ellipses_wrapper'>
                                  <div className='ellipses_child'>{item.player}</div>
                                </div>
                                <Button
                                  onClick={() => {
                                    setItems(items.filter((item, i) => i !== index));
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Row className='m-2'>
                          <Col xs={3}>
                            <SubmitButton func={submitForm} title='Submit' size='lg' />
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <SubmissionConfirmModal show={formSubmitted} setConfirm={submitFinalForm} />
      </div>
    </div>
  );
};

export default Submission;
