import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getSubmissions, approveRejectSubmissions, confirmSubmissionReceipt } from '../../services/submission';
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

  const handleApproveOrRejectClick = (subId, type, approve) => {
    approveRejectSubmissions(subId, type, approve)
      .then((data) => {
        setSubmissions(submissions?.map((sub) => (sub.id === subId ? data : sub)));
      })
      .catch((e) => {
        console.error(`${approve ? 'approve' : 'reject'} error`, e);
        alert(e.message);
      });
  };

  const handleConfirmReceiptClick = (subId, type) => {
    confirmSubmissionReceipt(subId, type)
      .then((data) => {
        setSubmissions(submissions?.map((sub) => (sub.id === subId ? data : sub)));
      })
      .catch((e) => {
        console.error(`confirm receipt error`, e);
        alert(e.message);
      });
  };

  return (
    <div className='page-wrapper'>
      <Row>
        {submissions?.map((submission, index) => (
          <Col key={'submissions_' + index} className='col-sm-12 col-md-4'>
            <SubmissionItem
              item={submission}
              onConfimReceipt={() => handleConfirmReceiptClick(submission.id, submission.type)}
              onApprove={() => handleApproveOrRejectClick(submission.id, submission.type, true)}
              onReject={() => handleApproveOrRejectClick(submission.id, submission.type, false)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SubmissionPage;
