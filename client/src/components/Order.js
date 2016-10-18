import React from 'react'

import PastOrders from './PastOrders'
import OrderForm from './OrderForm'
import { postOrder } from '../order'

const SaveOrder = (order) => {
  postOrder(order)
}

const Order = ({ params }) => {
  const id = +params.restaurantId

  return (
    <div>
      <PastOrders restaurantId={id}/>
      <OrderForm restaurantId={id}
        submitEvent={SaveOrder}/>
    </div>
  )
}

export default Order
