import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import './OrderDetails.scss';

const OrderDetails = () => {
  const printSection = (elementId) => {
    const printwin = window.open('');
    printwin.document.write(document.getElementById(elementId).innerHTML);
    printwin.stop();
    printwin.print();
    printwin.close();
  };

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
            <Col lg={6} className='text-center mb-2'>
              To send your order to Beckett Vault, please click the button below to print your order confirmation and
              include it in your shipping box.
            </Col>
            <Col lg={6} sm={12} className='text-center mb-4'>
              <strong>Ship orders to:</strong>
              <div>Beckett Collectibles</div>
              <div>C/O Beckett Vault</div>
              <div>2700 Summit Ave, Ste 100</div>
              <div>Plano, TX 75074</div>
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
