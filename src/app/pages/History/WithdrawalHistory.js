import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './History.scss';

export const withdrawalHistory = (props) => {
  const withdrawals = props.withdrawals;
  const selected = props.selected;
  const setSelected = props.setSelected;
  return (
    withdrawals.map((withdrawal) => {
      return (
        <div key={withdrawal.withdrawal_id}>
          <Row className='py-3 border' onClick={() => setSelected(withdrawal.withdrawal_id)}>
            <Col xs={8} className='fw-bold'>
              <div>{withdrawal.title}</div>
            </Col>
            <Col xs={3}>
              <div>{new Date(withdrawal.created_at).toLocaleDateString()} </div>
            </Col>
            <Col xs={1} className='right-align px-4'>
              &and;
            </Col>
          </Row>
          {selected === withdrawal.withdrawal_id && (
            <Row className='py-3 px-5 border'>
              <Col lg={3}>
                <div>Status: {withdrawal.status_desc}</div>
              </Col>
              <Col lg={5}>
                <div>Grading Company: {withdrawal.grading_company}</div>
              </Col>
              <Col lg={2}>
                <div>Serial Number: {withdrawal.serial_number}</div>
              </Col>
            </Row>
          )}
        </div>
      );
    })
  );
};
