import { request, handleErr } from './util'

/**
 * gets most recent orders for a restaurant
 * @param {number} id - requested restaurant
 * @return {array} last orders
 */
const getPastOrders = id => request.get(`user/pastOrders/${id}`).catch(handleErr)

/**
 * gets today's order
 * @return {object} today's order
 */
const getOrder = () => request.get(`user/order`).catch(handleErr)

/**
 * add/updates order
 * @param {object} order - { restaurantId, item, notes }
 * @return {object} completed order information
 */
const postOrder = order => request.post('user/order').catch(handleErr)

/**
 * add guest order
 * @param {object} order - { restaurantId, item, notes, first, last, email }
 * @return {object} completed order information
 */
const postGuestOrder = order => request.post('guest/order').catch(handleErr)

/**
 * gets all orders for today
 * @param {number} id - requested restaurant
 * @return {array} all orders
 */
const getTodayOrders = id => request.get(`restaurants/${id}/orders`).catch(handleErr)

export {
  getPastOrders,
  getOrder,
  postOrder,
  postGuestOrder,
  getTodayOrders
}
