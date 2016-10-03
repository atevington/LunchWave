import request from './util'

const getPastOrders = restaurantId => request.get(`user/pastOrders/${restaurantId}`)

const submitOrder = order => true

export {
  getPastOrders,
  submitOrder
}
