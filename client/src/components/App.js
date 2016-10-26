import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import Navbar from './Navbar'
import Restaurants from './Restaurants'
import Success from './Success'
import '../app.css'

import auth from '../auth'
import { getOrder } from '../order'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: auth.loggedIn(),
      name: undefined,
      picture: undefined,
      item: undefined,
      notes: undefined,
      id: undefined
    }
    this.updateAuth = this.updateAuth.bind(this)
    this.onReceiveOrder = this.onReceiveOrder.bind(this)
  }

  updateAuth(loggedIn, user) {
    if (loggedIn) {
      this.setState({
        loggedIn: loggedIn,
        name: user ? user.name : undefined,
        picture: user ? user.picture : undefined
      }, () => getOrder().then(this.onReceiveOrder))
    }
  }

  onReceiveOrder(order) {
    if (order.status !== 404) {
      this.setState({
        item: order.data.item,
        notes: order.data.notes,
        id: order.data.id
      })
    }
  }

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  }

  render() {
    let restaurants = null
    let success = null
    let landing = null

    if (this.state.loggedIn) {
      restaurants = <Restaurants />

      if (this.state.item) {
        success = (
          <Success item={this.state.item}
            notes={this.state.notes} />
        )
      }
    }
    // TODO: break this out into a component
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
          userName={this.state.name}
          picture={this.state.picture} />

        {/* TODO: format this layout better - sidenav and stuff */}
        <div className="container">
          {landing}
          {restaurants}
          {success}
          {this.props.children}
        </div>
      </div>
    )
  }
}
