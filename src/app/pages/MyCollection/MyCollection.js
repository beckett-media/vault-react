import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/auth';
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

  return (
    <div className='page-wrapper'>
      <div className='section-profile-info'>
        <UserBanner
          vaultedItems={vaultings?.length}
          vaultedValue={vaultings.reduce((prev, cur) => prev + cur.est_value, 0)}
        />
      </div>
      <div className='section-collection'>
        <CollectionGallery data={submissions} />
      </div>
    </div>
  );
};

export default Gallery;
