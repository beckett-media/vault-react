import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { ITEM_TYPE } from '../../services/items';
import { getSingleOrder } from '../../services/order';
import { getUserName, mapCognitoToUser } from '../../services/user';

import { AuthContext } from '../../contexts/auth';
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
          <div>Submission loading</div>
        </div>
      )}
      {!!error && (
        <div className='d-flex flex-column align-items-center'>
          <div>There was an error retrieving this Submission.</div>
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
          <div>
            <br />
          </div>
          <div>
            <b>Submission ID:</b> {order.id}
          </div>
          <div>
            <b>Submission date:</b> {Date(order.created_at).toLocaleString()}
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
            <b>Shipping address:</b>
          </div>
          <div>{user.shipAddressLine1}</div>
          <div>{user.shipAddressLine2}</div>
          <div>{user.shipCity}</div>
          <div>
            {user.shipState}, {user.shipZipcode}
          </div>
          <div>
            <br />
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
            <br />
            <b>Item details:</b>
          </div>
          {order.submissions.map((item, index) => (
            <div key={`order-items_${index}`}>
              Item ID: {item.id}
              <br />
              {item.type === ITEM_TYPE.TRADING_CARD &&
                `${item.year} ${item.set_name} ${item.card_number} ${item.player} -$${item.est_value}`}
              {item.type === ITEM_TYPE.COMIC &&
                `${item.title} ${item.issue} ${item.publisher} ${item.year} -$${item.est_value}`}
              <br />
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderPrint;
