import React, { useEffect, useState } from 'react';
import { Col, Row, Carousel } from 'react-bootstrap';
import { getTopStories } from '../../services/general';
import { fetchItems } from '../../services/items';
import { getSubmissions, approveRejectSubmissions } from '../../services/submission';
import { getAdminUserGroups } from '../../services/user';
import SubmissionItem from './SubmissionItem';

import './AdminPage.scss';

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const fetch = () => {
      getAdminUserGroups().then((res) => {
        console.log('admin user', res);
      });

      fetchItems().then((res) => {
        console.log('items', res);
      });

      getSubmissions().then((data) => {
        console.log('submissions', data);
        setSubmissions(data);
      });
    };

    fetch();
  }, []);

  const handleApproveClick = (subId) => {
    approveRejectSubmissions(subId, true).catch((e) => {
      console.error('approve error', e);
      alert(e.message);
    });
  };

  const handleRejectClick = (subId) => {
    approveRejectSubmissions(subId, false).catch((e) => {
      console.error('reject error', e);
      alert(e.message);
    });
  };

  return (
    <div className='page-wrapper'>
      <Row>
        {submissions.map((submission, index) => (
          <Col key={index} className='col-sm-12 col-md-6'>
            <SubmissionItem submission={submission} onApprove={handleApproveClick} onReject={handleRejectClick} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminPage;
