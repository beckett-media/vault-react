import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import './OrderDetails.scss';

const Print = () => {
  const [order, setOrder] = useState();
  const { orderId } = useParams;

  useEffect(() => {
    // TODO: get order data.
  }, [orderId]);

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
            <div className='mt-4'>Order info goes here</div>
            <div className='w-50 text-center mt-4'>
              To send your order to Beckett Vault, please click the button below to print your order confirmation and
              include it in your shipping box.
            </div>
          </div>
          <div className='mt-4 w-100 d-flex justify-content-center'>
            <Button onClick={() => printSection('print-area')}>Print order form</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Print;
