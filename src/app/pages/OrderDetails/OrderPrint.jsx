import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getOrders } from '../../services/order';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const OrderPrint = () => {
    const [order, setOrder] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {orderId} = useParams();

    useEffect(() => {
      setIsLoading(true)
      getOrders(orderId).then(resp => setOrder(resp)).catch(e => console.log(e))

    }, [orderId]);

  return (
    <div>
      {isLoading && (<LoadingSpinner/>)}
      {order && 'test'}
    </div>
  )
}

export default OrderPrint