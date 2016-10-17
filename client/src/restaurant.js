import { request, handleErr }  from './util'

/**
 * gets open restaurants for the current day
 * @return {array} restaurant list
 */
const getRestaurants = () => request.get('restaurants/open').catch(handleErr)

/**
 * gets restaurant details
 * @param {number} id - restuarant id
 * @return {object} restaurant details
 */
const getRestaurant = (id) => request.get(`restaurants/${id}`).catch(handleErr)

export {
  getRestaurants,
  getRestaurant
}
