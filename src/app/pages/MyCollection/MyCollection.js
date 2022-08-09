import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import { withdrawItem } from '../../services/items';
import { getUserName, mapCognitoToUser } from '../../services/user';
import CollectionGallery from '../../components/CollectionGallery/CollectionGallery';
import UserBanner from '../../components/UserBanner/UserBanner';

import './MyCollection.scss';

import { getSubmissions } from '../../services/submission';
import { formatPrice } from '../../utils/strings';

const Gallery = () => {
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);
  //  FETCH PAST SUBMISSIONS
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions({ user: userState.sub }).then((data) => {
      setSubmissions(Array.isArray(data) ? data : []);
    });
  }, [userState.sub]);

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
  const bannerDetails = (<div className='user-banner_content-layout'>
    <div className='user-banner_heading user-banner_grid-1'>{getUserName(userState)}</div>
    <div className='user-banner_body user-banner_grid-2'>Vaulted Items</div>
    <div className='user-banner_body user-banner_grid-3'>Vaulted Value</div>
    {/* Todo: add dynamic date-joined field */}
    <div className='user-banner_body user-banner_grid-4'>joined June, 2022</div>
    <div className='user-banner_stat-content user-banner_grid-5'>{submissions?.length}</div>
    <div className='user-banner_stat-content user-banner_grid-6'>
      {formatPrice(submissions.reduce((prev, cur) => prev + cur.est_value, 0))}
    </div>
  </div>)
  return (
    <div className='page-wrapper'>
      {!showConfirmationPage && (
        <>
          <div className='section-profile-info'>
            <UserBanner
              bannerDetails={bannerDetails}
            />
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
