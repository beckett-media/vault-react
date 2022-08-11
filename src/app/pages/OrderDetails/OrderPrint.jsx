import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const OrderPrint = () => {
    const [order, setOrder] = useState();
    const {orderId} = useParams();

    useEffect(() => {
        // TODO: get order data.
      }, [orderId]);

  return (
    <div>{orderId}</div>
  )
}

export default OrderPrint