import request from './util'

/**
 * gets most recent orders for a restaurant
 * @param {object} restaurantId - requested restaurant
 * @return {array} last orders
 */
const getPastOrders = id => request.get(`user/pastOrders/${id}`)

/**
 * gets today's order
 * @return {object} today's order
 */
const getOrder = () => request.get(`user/order`)

/**
 * add/updates order
 * @param {object} order - { restaurantId, item, notes }
 * @return {object} completed order information
 */
const postOrder = order => request.post('user/order')

/**
 * add guest order
 * @param {object} order - { restaurantId, item, notes, first, last, email }
 * @return {object} completed order information
 */
const postGuestOrder = order => request.post('guest/order')

/**
 * gets all orders for today
 * @param {object} restaurantId - requested restaurant
 * @return {array} all orders
 */
const getTodayOrders = id => request.get(`restaurants/${id}/orders`)

export {
  getPastOrders,
  postOrder,
  getTodayOrders
}
