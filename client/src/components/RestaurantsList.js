import React from 'react'
import { Link } from 'react-router'

const RestaurantsList = ({ restaurants }) => {
  return (
    <ul className="list-group">
      {restaurants.map((restaurant, index) => (
        <li className="list-group-item" key={index}>
          <Link to={`/order/${restaurant.id}`}
            activeClassName="active"
            onlyActiveOnIndex={true}>
            {restaurant.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

RestaurantsList.propTypes = {
  restaurants: React.PropTypes.array.isRequired
}

export default RestaurantsList
