import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getSubmissions, approveRejectSubmissions, confirmSubmissionReceipt } from '../../../services/submission';
import SubmissionItem from './SubmissionItem';
import Form from 'react-bootstrap/Form';

const SubmissionPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [submissionId, setSubmissionId] = useState('');
  const [orderId, setOrderId] = useState('');

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

  const filteredSubmissions = submissions.filter(
    (submission, index) =>
      (String(submission.order_id) === orderId || !orderId) &&
      (String(submission.id) === submissionId || !submissionId),
  );

  const mdSpan = filteredSubmissions.length === 1 ? 12 : filteredSubmissions.length === 2 ? 6 : 4;

  return (
    <div className='page-wrapper'>
      <Row>
        <Col>
          <Form.Label htmlFor='order_filter'>Order ID</Form.Label>
          <Form.Control
            id='order_filter'
            aria-describedby='order_filter_desc'
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            type='text'
          />
          <Form.Text id='order_filter_desc' muted>
            Enter order ID
          </Form.Text>
        </Col>
        <Col>
          <Form.Label htmlFor='submission_filter'>Submission ID</Form.Label>
          <Form.Control
            id='submission_filter'
            aria-describedby='submission_filter_desc'
            value={submissionId}
            onChange={(e) => setSubmissionId(e.target.value)}
            type='text'
          />
          <Form.Text id='submission_filter_desc' muted>
            Enter submission ID
          </Form.Text>
        </Col>
      </Row>
      <Row>
        {filteredSubmissions.map((submission, index) => (
          <Col key={'submissions_' + index} className={`col-sm-12 col-md-${mdSpan}`}>
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
