import React, { useState, useContext, useEffect } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import { AuthContext } from '../../contexts/auth';
import { mapCognitoToUser } from '../../services/user';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import './Submission.scss';

import SubmissionResponse from './SubmissionResponse';
import SubmissionAdd from './SubmissionAdd';
import UserBanner from '../../components/UserBanner/UserBanner';
import { Button } from 'react-bootstrap';

import { postSubmission } from '../../services/submission';
import { formatSubmissionItem } from '../../utils/submissions';
import FooterModal from '../../components/FooterModal/FooterModal';

const Submission = () => {
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);
  const [items, setItems] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTOS, setShowTOS] = useState('');

  const dismissModal = () => setShowTOS('');

  console.log(submissionResponse);

  // useEffect(), [submissionResponse]

  const navigate = useNavigate();

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

  const handleSubmitForm = () => {
    const uuid = uuidv4();
    Promise.all(
      items.map((item) =>
        postSubmission({
          ...formatSubmissionItem(item, uuid),
          user: userState.sub,
        }),
      ),
    )
      .then((resp) => {
        console.log(resp);
        console.log('success');
        console.log(resp[0].data.order_id);
        navigate(`/order-details/${resp[0].data.order_id}`);
      })
      .catch((e) => {
        setSubmissionResponse(e);
        setShowModal(false);
      });
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
                      submissionResponse={submissionResponse}
                      setSubmissionResponse={setSubmissionResponse}
                      body='Please try again.'
                    />
                  </div>
                ) : (
                  <>
                    {items.length !== 0 && (
                      <>
                        <div className='submission_container mt-4'>
                          <div className='submission_heading'>My Items to Submit</div>
                        </div>
                        <div className='submission_items submission_container'>
                          {items.map((item, index) => (
                            <div key={`submission_${index}`} className='submission-item_component'>
                              <div className='submission-item_layout'>
                                <div className='ellipses_wrapper submission-item_item'>
                                  <div className='ellipses_child'>{item.year || item.title}</div>
                                </div>
                                <div className='ellipses_wrapper submission-item_item'>
                                  <div className='ellipses_child'>{item.setName || item.issue}</div>
                                </div>
                                <div className='ellipses_wrapper submission-item_item'>
                                  <div className='ellipses_child'>{item.cardNumber || item.publisher}</div>
                                </div>
                                <div className='ellipses_wrapper submission-item_item'>
                                  <div className='ellipses_child'>{item.player || item.year}</div>
                                </div>
                                <Button
                                  className='ms-auto'
                                  bg='transparent'
                                  variant='outline-primary'
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
                        <div className='m-2 d-flex flex-column align-items-center'>
                          <Button className='' onClick={() => setShowModal(true)}>
                            Submit
                          </Button>
                          <Button
                            variant='link'
                            color='black'
                            fontWeight='400'
                            fontSize='14px'
                            _focus={{ boxShadow: 'none' }}
                            onClick={() => {
                              setShowFooterModal('terms');
                            }}
                          >
                            Terms of Service
                          </Button>
                          <FooterModal
                            showFooterModal={showTOS}
                            openModal={showTOS.length}
                            dismissModal={dismissModal}
                          />
                        </div>
                      </>
                    )}

                    <div className='submission_container my-4'>
                      <SubmissionAdd submitAddedItem={submitAddedItem} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <Modal className='text-body' show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you'd like to submit?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Once submitted, your items will be staged for vaulting.</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                submitFinalForm();
              }}
            >
              Confirm submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Submission;
