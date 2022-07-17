import React, { useEffect, useState } from 'react';
import { Col, Row, Carousel } from 'react-bootstrap';
import { getTopStories } from '../../services/general';
import { fetchItems } from '../../services/items';
import { getSubmissions } from '../../services/submission';
import { getAdminUserGroups } from '../../services/user';

import './AdminPage.scss';

const AdminPage = () => {
  const [topStories, setTopStories] = useState([]);
  useEffect(() => {
    const fetch = () => {
      getAdminUserGroups().then((res) => {
        console.log('admin user', res);
      });

      fetchItems().then((res) => {
        console.log('items', res);
      });

      getSubmissions().then((res) => {
        console.log('submissions', res);
      });
    };

    fetch();
  }, []);

  return (
    <div className='page-wrapper'>
      <p>Hey there!</p>
    </div>
  );
};

export default AdminPage;
