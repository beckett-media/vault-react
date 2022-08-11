import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getSingleOrder } from '../../services/order';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const OrderPrint = () => {
  const [order, setOrder] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { orderId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSingleOrder(orderId)
      .then((resp) => setOrder(resp))
      .then(setIsLoading(false))
      .catch((e) => {
        console.log('error');
        setError(true);
      });
  }, [orderId]);

  console.log(order);

  return (
    <div>
      {isLoading && (
        <div className='d-flex flex-column align-items-center'>
          <LoadingSpinner />
          <div>order loading</div>
        </div>
      )}
      {error && (
        <div className='d-flex flex-column align-items-center'>
          <div>There was an error retrieving this order.</div>
          <Button onClick={() => setError(false)}>OK</Button>
        </div>
      )}
      {order && 'test'}
    </div>
  );
};

export default OrderPrint;
