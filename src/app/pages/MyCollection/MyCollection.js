import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import { withdrawItem } from '../../services/items';
import { mapCognitoToUser } from '../../services/user';
import CollectionGallery from '../../components/CollectionGallery/CollectionGallery';
import UserBanner from '../../components/UserBanner/UserBanner';

import './MyCollection.scss';

import { getVaulting } from '../../services/items';
import { getSubmissions } from '../../services/submission';

const Gallery = () => {
  const authContext = useContext(AuthContext);
  const userState = mapCognitoToUser(authContext.attrInfo);
  //  FETCH PAST vaultings
  const [vaultings, setVaultings] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getVaulting({ user: userState.sub }).then((data) => {
      setVaultings(Array.isArray(data) ? data : []);
    });
  }, [userState.sub]);

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

  return (
    <div className='page-wrapper'>
      {!showConfirmationPage && (
        <>
          <div className='section-profile-info'>
            <UserBanner
              vaultedItems={vaultings?.length}
              vaultedValue={vaultings.reduce((prev, cur) => prev + cur.est_value, 0)}
            />
          </div>
          {!showConfirmationPage && vaultings.filter((item) => item.minted_at === 0).length ? (
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
