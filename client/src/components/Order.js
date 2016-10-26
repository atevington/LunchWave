import React from 'react'
import { withRouter } from 'react-router'

import PastOrders from './PastOrders'
import OrderForm from './OrderForm'
import { postOrder } from '../order'

const Order = ({ params, router }) => {
  const id = +params.restaurantId
  const SaveOrder = order => {
    postOrder(order)
      .then(res => {
        //if (res.status === 200) router.push('/')
        // TODO: remove this hack - use a callback or something to update App state
        if (res.status === 200) window.location.href = '/'
      })
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
