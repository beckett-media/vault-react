import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getSubmissions, approveRejectSubmissions, confirmSubmissionReceipt } from '../../services/submission';
import AdminPagination from './AdminPagination';
import SubmissionItem from './SubmissionItem';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Form from 'react-bootstrap/Form';

const pageSize = 15;

const SubmissionPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [submissionId, setSubmissionId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = () => {
      setIsLoading(true);

      getSubmissions({ limit: pageSize, offset: (pageNumber - 1) * pageSize })
        .then((data) => {
          setSubmissions(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetch();
  }, [pageNumber]);

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
      {isLoading ? (
        <LoadingSpinner />
      ) : !isLoading && submissions.length === 0 ? (
        <span>No submissions</span>
      ) : submissions.length > 0 ? (
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
      ) : null}
      <Row className='py-4'>
        <AdminPagination onPageSelect={setPageNumber} currentPage={pageNumber} minPage={1} maxPage={20} />
      </Row>
    </div>
  );
};

export default SubmissionPage;
