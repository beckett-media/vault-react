import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getSubmissions, approveRejectSubmissions } from '../../services/submission';
import SubmissionItem from './SubmissionItem';

const SubmissionPage = () => {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const fetch = () => {
      getSubmissions().then((data) => {
        setSubmissions(data);
      });
    };

    fetch();
  }, []);

  const handleApproveOrRejectClick = (subId, approve) => {
    approveRejectSubmissions(subId, approve)
      .then((data) => {
        setSubmissions(submissions.map((sub) => (sub.id === subId ? data : sub)));
      })
      .catch((e) => {
        console.error(`${approve ? 'approve' : 'reject'} error`, e);
        alert(e.message);
      });
  };

  return (
    <div className='page-wrapper'>
      <Row>
        {submissions.map((submission, index) => (
          <Col key={Math.random() * 1000} className='col-sm-12 col-md-6'>
            <SubmissionItem
              item={submission}
              onApprove={(id) => handleApproveOrRejectClick(id, true)}
              onReject={(id) => handleApproveOrRejectClick(id, false)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SubmissionPage;
