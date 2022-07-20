import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './History.scss';

export const itemsHistory = (props) => {
  const historyItems = props.historyItems;
  const selected = props.selected;
  const setSelected = props.setSelected;

  const mapHistoryComponents = (items) => items.map((item) => 
      <div key={item.id} id={item.id}>
        <Row className='py-3 border' onClick={() => setSelected(item.id)}>
          <Col xs={8} className='fw-bold'>
            <div>{item.title}</div>
          </Col>
          <Col xs={3}>
            <div>{new Date(item.created_at).toLocaleDateString()}</div>
          </Col>
          <Col xs={1} className='right-align px-4'>
            &and;
          </Col>
        </Row>
        {selected === item.id && (
          <Row className='py-3 px-5 border'>
            <Col lg={3}>
              <div>Status: {item.status_desc}</div>
            </Col>
            <Col lg={5}>
              <div>{'Grading Company: ' + item.grading_company}</div>
            </Col>
            <Col lg={2}>
              <div>Serial Number: {item.serial_number}</div>
            </Col>
          </Row>
        )}
      </div>
    )
  return (
    historyItems && mapHistoryComponents(historyItems)
  );
};
