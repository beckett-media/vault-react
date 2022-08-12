import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getSingleOrder } from '../../services/order';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import { AuthContext } from '../../contexts/auth';
import { mapCognitoToUser } from '../../services/user';
import { formatPrice } from '../../utils/strings';

const OrderPrint = () => {
  const authContext = useContext(AuthContext);
  const user = mapCognitoToUser(authContext.attrInfo);
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

  const sumObject = (property) => {};

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
      {order && (
        <>
          <div>
            <b>Order date:</b> {Date(order.created_at).toLocaleString()}
          </div>
          <div>
            <b>Email address:</b> {user.email}
          </div>
          {user.phone && (
            <div>
              <b>Phone number:</b> {user.phone}
            </div>
          )}
          <div>
            <b>Number of cards:</b> {order.submissions.length}
          </div>
          <div>
            <b>Declared value:</b>
            {' ' +
              formatPrice(
                order.submissions?.reduce((p, c) => {
                  return p + (c.est_value - 0);
                }, 0),
              )}
          </div>
          <div>
            <b>Card details:</b>
          </div>
          {order.submissions.map((item, index) => (
            <div key={`ordeer-items_${index}`}>
              <div>
                {item.year} {item.title || item.player}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderPrint;
