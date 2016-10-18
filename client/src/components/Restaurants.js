import React, { Component } from 'react'

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
    return <RestaurantsList restaurants={this.state.restaurants}/>
  }
}
