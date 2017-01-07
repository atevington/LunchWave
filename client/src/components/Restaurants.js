import React, { PropTypes, Component } from 'react'

import { getRestaurants } from '../restaurant'
import RestaurantsList from '../components/RestaurantsList'

export default class Restaurants extends Component {
  constructor() {
    super()
    this.state = {
      restaurants: []
    }
  }

  componentWillMount() {
    getRestaurants()
      .then(res => {
        this.setState({
          restaurants: res.data
        })
      })
  }

  render() {
    return (
      <RestaurantsList
        selectedId={this.props.selectedId}
        restaurants={this.state.restaurants}
        callback={this.props.onRestaurantSelect} />
    )
  }
}

Restaurants.propTypes = {
  onRestaurantSelect: PropTypes.func.isRequired,
  selectedId: PropTypes.number
}
