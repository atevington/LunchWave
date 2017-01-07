import React, { PropTypes } from 'react'

const RestaurantsList = ({ restaurants, callback, selectedId }) => {
  return (
    <ul className="list-group">
      {restaurants.map(({ name, id}, index) => (
        <li className="list-group-item" key={index}>
          <a className={id === selectedId ? 'active' : null}
            onClick={() => callback(id)}>
            {name}
          </a>
        </li>
      ))}
    </ul>
  )
}

RestaurantsList.propTypes = {
  restaurants: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
  selectedId: PropTypes.number
}

export default RestaurantsList
