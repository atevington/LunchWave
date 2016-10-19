import React from 'react'

import PastOrders from './PastOrders'
import OrderForm from './OrderForm'
import { postOrder } from '../order'
import { withRouter } from 'react-router'

const Order = ({ params, router }) => {
  const id = +params.restaurantId
  const SaveOrder = order => {
    postOrder(order)
    router.push('/')
  }

  return (
    <div>
      <PastOrders restaurantId={id}/>
      <OrderForm restaurantId={id}
        submitEvent={SaveOrder.bind(this)}/>
    </div>
  )
}

export default withRouter(Order)
