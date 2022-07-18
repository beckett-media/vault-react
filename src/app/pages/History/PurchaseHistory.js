import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './History.scss';

export const purchaseHistory = (props) => {
  const purchases = props.purchases;
  const selected = props.selected;
  const setSelected = props.setSelected;
  return (
    purchases.map((purchase) => {
      return (
        <div key={purchase.purchase_id}>
          <Row className='py-3 border' onClick={() => setSelected(purchase.purchase_id)}>
            <Col xs={8} className='fw-bold'>
              <div>{purchase.title}</div>
            </Col>
            <Col xs={3}>
              <div>{new Date(purchase.created_at).toLocaleDateString()} </div>
            </Col>
            <Col xs={1} className='right-align px-4'>
              &and;
            </Col>
          </Row>
          {selected === purchase.purchase_id && (
            <Row className='py-3 px-5 border'>
              <Col lg={3}>
                <div>Status: {purchase.status_desc}</div>
              </Col>
              <Col lg={5}>
                <div>Grading Company: {purchase.grading_company}</div>
              </Col>
              <Col lg={2}>
                <div>Serial Number: {purchase.serial_number}</div>
              </Col>
            </Row>
          )}
        </div>
      );
    })
  );
};
