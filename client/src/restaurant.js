import request from './util'

const getRestaurants = () => request.get('restaurants/open')

export {
  getRestaurants
}
