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
  //  INITIAL FETCH
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  //  FETCH PAST SUBMISSIONS
  const [submissions, setSubmissions] = useState([]);

  const submissionsObj = async () => await getSubmissions(user.name);
  useEffect(() => {
    const fetchSubmissions = async () =>
      submissionsObj().then((res) => setSubmissions(Array.isArray(res.data) ? res.data : []));
    user && fetchSubmissions();
    console.log('fix for array error');
  }, [user]);

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
      Promise.all([selectedItemIds.map((id) => withdrawItem(id))])
        .then((alls) => {
          console.log('withdraw call result', alls);

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
            <CollectionGallery data={items} />
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
