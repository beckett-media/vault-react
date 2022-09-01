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
import SubmissionConfirmModal from './SubmissionConfirmModal';

const Submission = () => {
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);
  const [items, setItems] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [showTOS, setShowTOS] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userAddressConfirmed, setUserAddressConfirmed] = useState(false);

  const dismissShowModal = () => setShowModal(false);
  const dismissModal = () => setShowTOS('');
  const confirmUserAddress = () => {
    setUserAddressConfirmed(true);
    setShowModal(false);
  };

  // useEffect(), [submissionResponse]

  const navigate = useNavigate();

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

  const handleSubmitForm = () => {
    setIsLoading(true);
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
        navigate(`/order-details/${resp[0].data.order_id}`);
      })
      .catch((e) => {
        setSubmissionResponse(e);
        setShowModal(false);
      })
      .finally(() => setIsLoading(false));
  };

  const submitFinalForm = async () => {
    setShowModal(false);
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
                                  <div className='ellipses_child'>{(!item.publisher && item.year) || item.title}</div>
                                </div>
                                <div className='ellipses_wrapper submission-item_item'>
                                  <div className='ellipses_child'>
                                    {(!item.publisher && item.setName) || '#' + item.issue}
                                  </div>
                                </div>
                                <div className='ellipses_wrapper submission-item_item'>
                                  <div className='ellipses_child'>
                                    {(!item.publisher && '#' + item.cardNumber) || item.publisher}
                                  </div>
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
                              setShowTOS('terms');
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
        <SubmissionConfirmModal
          show={showModal}
          setConfirm={submitFinalForm}
          cancel={dismissShowModal}
          isLoading={isLoading}
          userAddressConfirmed={userAddressConfirmed}
          confirmUserAddress={confirmUserAddress}
        />
      </div>
    </div>
  );
};

export default Submission;
