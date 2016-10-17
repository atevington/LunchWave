import React from 'react'

import PastOrders from './PastOrders'
import OrderForm from './OrderForm'

const Order = ({ params }) => {
  const id = +params.restaurantId

  return (
    <div>
      <PastOrders restaurantId={id}/>
      <OrderForm restaurantId={id}
        submitEvent={console.log.bind(console)}/>
    </div>
  )
}

export default Order
