import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './History.scss';

export const itemsHistory = (props) => {
  const { 
    sortedItems,
    setSelected,
    historyItemDetails 
  } = props;
  const mapHistoryComponents = (items) =>
    items?.map((item) => (
      <div key={item.id} id={item.id}>
        <Row className='py-3 border' onClick={() => 
          setSelected(`${item.entity}-${item.entity_type_desc}`)}
        >
          <Col xs={8} className='fw-bold'>
            <div>{item.type_desc}</div>
          </Col>
          <Col xs={3}>
            <div>{new Date(item.created_at).toLocaleDateString()}</div>
          </Col>
          <Col xs={1} className='right-align px-4'>
            &and;
          </Col>
        </Row>
        {historyItemDetails.id === Number(item.entity) && (
          <Row className='py-3 px-5 border'>
            <Col lg={2}>
              <div>{'Status: '}<br/>
                <span className='fw-bold'>{historyItemDetails.status_desc}</span>
              </div>
            </Col>
            <Col lg={2}>
              <div>{`${item.entity_type_desc} ID: `}<br/>
                <span className='fw-bold'>{historyItemDetails.id}</span>
              </div>
            </Col>
            <Col lg={8}>
              <div>{'Item: '}<br/>
                <span className='fw-bold'>{historyItemDetails.title}</span>
              </div>
            </Col>
          </Row>
        )}
      </div>
    ));
  return sortedItems && mapHistoryComponents(sortedItems);
};
