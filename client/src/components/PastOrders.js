import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'

import OrdersList from './OrdersList'
import { getPastOrders } from '../order'
import { getRestaurants } from '../restaurant'

export default class PastOrders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: [],
      restaurants: [],
      // TODO: add a restaurant selection so this isn't hardcoded
      restaurantId: 1
    }
  }

  componentWillMount() {
    const id = this.state.restaurantId

    axios.all([getPastOrders(id), getRestaurants()])
      .then(axios.spread((orders, restaurants) => {
        this.setState({
          orders: orders.data,
          restaurants: restaurants.data
        })
      }))
  }

  render() {
    var s = this.state

    if (s.restaurants.length)
      var name = _.find(s.restaurants, r => r.id = s.restaurantId).name

    return (
      <div>
        <h1>{name}</h1>
        <h3>Last {s.orders.length} order{s.orders.length > 1 ? 's' : null}</h3>
        <OrdersList orders={s.orders} />
      </div>
    )
  }
}

PastOrders.propTypes = {
  restaurantId: React.PropTypes.number.isRequired
}
