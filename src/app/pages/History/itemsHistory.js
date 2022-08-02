import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './History.scss';

export const itemsHistory = (props) => {
  const { sortedItems, setSelected, historyItemDetails } = props;

  const mapHistoryComponents = (items) =>
    items?.map((item) => {
      const isSelected = historyItemDetails.id === Number(item.entity);
      return (
        <div key={item.id} id={item.id}>
          <Row className='py-3 border' onClick={() => setSelected(`${item.entity}-${item.entity_type_desc}`)}>
            <Col xs={8} className='fw-bold'>
              <div>
                {item.type_desc} - {item.id}
              </div>
            </Col>
            <Col xs={3}>
              <div>{new Date(item.created_at).toLocaleDateString()}</div>
            </Col>
            {isSelected ? (
              <Col xs={1} className='right-align px-4'>
                &and;
              </Col>
            ) : (
              <Col xs={1} className='right-align px-4'>
                &or;
              </Col>
            )}
          </Row>
          {isSelected && (
            <Row className='py-3 px-5 border'>
              <Col lg={2}>
                <div>
                  {'Status: '}
                  <br />
                  <span className='fw-bold'>{historyItemDetails.status_desc}</span>
                </div>
              </Col>
              <Col lg={2}>
                <div>
                  {`${item.entity_type_desc} ID: `}
                  <br />
                  <span className='fw-bold'>{historyItemDetails.id}</span>
                </div>
              </Col>
              <Col lg={8}>
                <div>
                  {'Item: '}
                  <br />
                  <span className='fw-bold'>{historyItemDetails.title}</span>
                </div>
              </Col>
            </Row>
          )}
        </div>
      );
    });
  return sortedItems && mapHistoryComponents(sortedItems);
};
