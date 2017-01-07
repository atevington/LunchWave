import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import Navbar from './Navbar'
import Restaurants from './Restaurants'
import Success from './Success'
import Order from './Order'

import '../app.css'

import auth from '../auth'
import { getOrder } from '../order'


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: auth.loggedIn(),
      name: null,
      picture: null,
      item: null,
      notes: null,
      id: null,
      selectedId: null
    }
  }

  updateOrder = ({ item, notes, id }) => (
    this.setState({ item, notes, id, })
  )

  updateAuth = (loggedIn, user) => {
    if (loggedIn) {
      this.setState({
        loggedIn: loggedIn,
        name: user ? user.name : null,
        picture: user ? user.picture : null
      }, () => getOrder().then(this.onReceiveOrder))
    }
  }

  onReceiveOrder = ({ status, data: { item, notes, id } }) => {
    if (status !== 404) {
      this.updateOrder({ item, notes, id })
    }
  }

  onRestaurantSelect = selectedId => {
    this.setState({ selectedId })
  }

  onOrderSave = ({ item, notes, id }) => {
    this.updateOrder({ item, notes, id })
  }

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  }

  render() {
    const {
      name,
      picture,
      loggedIn,
      selectedId,
      item,
      notes
    } = this.state
    let restaurants = null
    let success = null
    let landing = null

    if (loggedIn) {
      restaurants = (
        <Restaurants selectedId={selectedId}
          onRestaurantSelect={this.onRestaurantSelect} />
      )

      if (item) {
        success = (
          <Success item={item}
            notes={notes} />
        )
      }

      if (selectedId) {
        landing = (
          <Order
            restaurantId={selectedId}
            onSuccess={this.onOrderSave} />
        )
      }
    }
    else landing = (
      <div className="row">
        <div className="col-md-6 col-lg-6 col-md-offset-2 col-lg-offset-3">
          <div className="alert alert-warning">
            <h4 className="alert-heading">WOAH!</h4>
            <p className="mb-0">You must log into LunchWave with your Google email account before you can place a lunch order.</p>
          </div>
        </div>
      </div>
    )


    return (
      <div>
        <Navbar
          userName={name}
          picture={picture} />

        <div className="container">
          {restaurants}
          {success}
          {landing}
          {this.props.children}
        </div>
      </div>
    )
  }
}
