import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { fetchItems } from '../../services/items';
import { approveRejectSubmissions } from '../../services/submission';
import VaultingItem from './VaultingItem';

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
        {items.map((submission, index) => (
          <Col key={index} className='col-sm-12 col-md-6'>
            <VaultingItem
              submission={submission}
              onApprove={(id) => handleApproveOrRejectClick(id, true)}
              onReject={(id) => handleApproveOrRejectClick(id, false)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VaultingPage;
