import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { getItems, withdrawItem } from '../../services/items';
import { Link } from 'react-router-dom';

import UserInfo from '../../components/UserInfo/UserInfo';
import CollectionGallery from '../../components/CollectionGallery/CollectionGallery';

import './MyCollection.scss';

import { getSubmissions } from '../../services/submission';
import { getUser } from '../../services/user';

const Gallery = () => {
  //  FETCH PAST SUBMISSIONS
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getUser()
      .then(() => getItems())
      .then((data) => {
        setSubmissions(Array.isArray(data) ? data : []);
      });
  }, []);

  //  SELLING & WITHDRAWAL
  const [showConfirm, toggleConfirm] = useState(false);
  const [showConfirmationPage, toggleShowConfirmationPage] = useState(false);
  const [withdrawOrList, setWithdrawOrList] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const withdrawItems = (evt) => {
    setWithdrawOrList(evt.target.id);
    toggleShowConfirmationPage(true);
  };

  const cancelConfirm = () => toggleConfirm(false);

  const cancelConfirmAction = () => {
    toggleShowConfirmationPage(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const confirmAction = async () => {
    if (withdrawOrList === 'withdraw') {
      Promise.all([selectedItemIds?.map((id) => withdrawItem(id))])
        .then((alls) => {
          setSelectedItemIds([]);
          toggleShowConfirmationPage(false);
          setSuccessMessage('Withdrawal successful');
        })
        .catch((err) => {
          console.error('withdraw call error', err);
          setErrorMessage('Withdrawal failed');
        });
    } else {
      // List
    }
  };

  return (
    <div className='page-wrapper'>
      {!showConfirmationPage && (
        <>
          <div className='section-profile-info'>
            <div className='page-padding'>
              <div className='container-large'>
                <UserInfo />
              </div>
            </div>
          </div>
          {!showConfirmationPage && submissions.filter((item) => item.minted_at === 0).length ? (
            <Row>
              <Col>
                <Link to='/history'>
                  <Button>SHOW PENDING ITEMS</Button>
                </Link>
              </Col>
            </Row>
          ) : (
            <></>
          )}

          <div className='section-collection'>
            <CollectionGallery data={submissions} />
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
