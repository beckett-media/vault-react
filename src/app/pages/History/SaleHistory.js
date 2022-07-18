import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './History.scss';

export const saleHistory = (props) => {
  const sales = props.sales;
  const selected = props.selected;
  const setSelected = props.setSelected;
  return (
    sales.map((sub) => {
      return (
        <div key={sub.sale_id}>
          <Row className='py-3 border' onClick={() => setSelected(sub.sale_id)}>
            <Col xs={8} className='fw-bold'>
              <div>{sub.title}</div>
            </Col>
            <Col xs={3}>
              <div>{new Date(sub.created_at).toLocaleDateString()} </div>
            </Col>
            <Col xs={1} className='right-align px-4'>
              &and;
            </Col>
          </Row>
          {selected === sub.sale_id && (
            <Row className='py-3 px-5 border'>
              <Col lg={3}>
                <div>Status: {sub.status_desc}</div>
              </Col>
              <Col lg={5}>
                <div>Grading Company: {sub.grading_company}</div>
              </Col>
              <Col lg={2}>
                <div>Serial Number: {sub.serial_number}</div>
              </Col>
            </Row>
          )}
        </div>
      );
    })
  );
};
