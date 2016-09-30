import React, { Component } from 'react'
import { Link } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css'

import auth from '../auth'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: auth.loggedIn()
    }
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this)
    auth.login()
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
            {this.state.loggedIn ? (
              <li><Link to="/dashboard">Dashboard</Link></li> 
            ) : (
              null
            )}
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
}
