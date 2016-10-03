import request from './util'

const getRestaurants = () => request.get('restaurants')

export {
  getRestaurants
}
