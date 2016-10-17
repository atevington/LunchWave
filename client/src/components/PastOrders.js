import React, { Component } from 'react'
import axios from 'axios'

import OrdersList from './OrdersList'
import { getPastOrders } from '../order'
import { getRestaurants } from '../restaurant'

export default class PastOrders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: [],
      restaurants: []
    }
  }

  componentWillMount() {
    axios.all([getPastOrders(this.props.restaurantId), getRestaurants()])
      .then(axios.spread((orders, restaurants) => {
        this.setState({
          orders: orders.data,
          restaurants: restaurants.data
        })
      }))
  }

  render() {
    const s = this.state
    const name = s.restaurants.length
      ? s.restaurants.find(r => r.id === this.props.restaurantId).name
      : ''

    return (
      <div>
        <h1>{name}</h1>
        {s.orders.length > 0 ? <h3>Previous Orders</h3> : null }
        <OrdersList orders={s.orders} />
      </div>
    )
  }
}

PastOrders.propTypes = {
  restaurantId: React.PropTypes.number.isRequired
}
