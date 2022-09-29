import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import './OrderDetails.scss';

import { printSection } from '../../utils/print';

const OrderDetails = () => {
  return (
    <div className='page-wrapper'>
      <div className='page-padding'>
        <div className='container-large'>
          <div className='w-100 d-flex flex-column align-items-center mt-4' id='print-area'>
            <h2>Order Confirmation</h2>
            <div className='mt-4'>
              <Outlet />
            </div>
          </div>
          <div className='mt-4 w-100 d-flex flex-column align-items-center'>
            <Col lg={6} className='text-center mb-4'>
              To send your order to Beckett Vault, please click the button below to print your order confirmation and
              <strong> include it in your shipping box.</strong>
            </Col>
            <Button className='mb-4' onClick={() => printSection('print-area')}>
              Print order form
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
