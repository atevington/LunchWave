import React, { PropTypes, Component } from 'react'
import axios from 'axios'
import classNames from 'classnames'

import OrdersList from './OrdersList'
import { getPastOrders } from '../order'
import { getRestaurants } from '../restaurant'

export default class PastOrders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: [],
      restaurants: [],
      hidden: true
    }
  }

  componentWillMount() {
    this.getRestaurantDetails()
  }

  componentWillReceiveProps() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = () => {
    axios.all([getPastOrders(this.props.restaurantId), getRestaurants()])
      .then(axios.spread((orders, restaurants) => {
        this.setState({
          orders: orders.data,
          restaurants: restaurants.data
        })
      }))
  }

  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const ordersClass = classNames({ hidden: this.state.hidden })
    const toggleClass = classNames({ hidden: !this.state.orders.length })
    const { restaurants, orders } = this.state
    const { restaurantId } = this.props

    const name = restaurants.length
      ? restaurants.find(r => r.id === restaurantId).name
      : ''

    return (
      <section>
        <div className="row">
          <div className="col-md-6">
            <h1>{name}</h1>
            <span className={toggleClass}
              onClick={this.toggleShow}>
              {this.state.hidden ? 'Show' : 'Hide'} Orders
            </span>
          </div>
        </div>
        <div className={Object.assign(ordersClass, { row: true })}>
          <div className="col-md-6">
            {orders.length > 0 ? <h3>Previous Orders</h3> : null}
            <OrdersList orders={orders} />
          </div>
        </div>
      </section>
    )
  }
}

PastOrders.propTypes = {
  restaurantId: PropTypes.number.isRequired
}
