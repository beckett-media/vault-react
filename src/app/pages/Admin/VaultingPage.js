import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { fetchItems } from '../../services/items';
import { approveRejectSubmissions } from '../../services/submission';
import SubmissionItem from './SubmissionItem';

const VaultingPage = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetch = () => {
      fetchItems().then((data) => {
        setItems(data);
      });
    };

    fetch();
  }, []);

  const handleApproveClick = (subId) => {
    approveRejectSubmissions(subId, true)
      .then((data) => {
        setItems(items.map((sub) => (sub.id === subId ? data : sub)));
      })
      .catch((e) => {
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
        {items.map((submission, index) => (
          <Col key={index} className='col-sm-12 col-md-6'>
            <SubmissionItem submission={submission} onApprove={handleApproveClick} onReject={handleRejectClick} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VaultingPage;
