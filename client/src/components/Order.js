import React, { PropTypes } from 'react'

import PastOrders from './PastOrders'
import OrderForm from './OrderForm'

import { postOrder } from '../order'

const Order = ({ restaurantId, onSuccess }) => {
  const saveOrder = order => {
    postOrder(order).then(res => {
      if (res.status === 200) {
        onSuccess(order)
      }
    })
  }

  return (
    <div>
      <PastOrders restaurantId={restaurantId} />
      <OrderForm
        restaurantId={restaurantId}
        submitEvent={saveOrder} />
    </div>
  )
}

Order.propTypes = {
  restaurantId: PropTypes.number,
  onSuccess: PropTypes.func
}

export default Order
