import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getSingleOrder } from '../../services/order';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import { AuthContext } from '../../contexts/auth';
import { mapCognitoToUser, getUserName } from '../../services/user';
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
    <div className='order-details_print'>
      {isLoading && (
        <div className='d-flex flex-column align-items-center'>
          <LoadingSpinner />
          <div>order loading</div>
        </div>
      )}
      {!!error && (
        <div className='d-flex flex-column align-items-center'>
          <div>There was an error retrieving this order.</div>
          <Button onClick={() => setError(false)}>OK</Button>
        </div>
      )}
      {!!order && (
        <>
          <div>
            <strong>Ship orders to:</strong>
            <div>Beckett Collectibles</div>
            <div>C/O Beckett Vault</div>
            <div>2700 Summit Ave, Ste 100</div>
            <div>Plano, TX 75074</div>
          </div>
          <div>----</div>
          <div>
            <b>Order ID:</b> {order.id}
          </div>
          <div>
            <b>Order date:</b> {Date(order.created_at).toLocaleString()}
          </div>
          <div>
            <b>Name:</b> {getUserName(user)}
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
            <b>Number of items:</b> {order.submissions.length}
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
            <b>Item details:</b>
          </div>
          {order.submissions.map((item, index) => (
            <div key={`order-items_${index}`}>
              ----- <br />
              Submission ID: {item.id}
              <br />
              {item.type === 1 && item.year + ' ' + item.set_name + ' ' + item.card_number + ' ' + item.player}
              {item.type === 2 && item.title + ' ' + item.issue + ' ' + item.publisher + ' ' + item.year}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderPrint;
