import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import Navbar from './Navbar'
import '../app.css'

import auth from '../auth'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: auth.loggedIn(),
      name: undefined,
      picture: undefined
    }
  }

  updateAuth(loggedIn, user) {
    this.setState({
      loggedIn: loggedIn,
      name: user ? user.name : undefined,
      picture: user ? user.picture : undefined
    })
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this)
    auth.login()
  }

  render() {
    return (
      <div>
        <Navbar userName={this.state.name} picture={this.state.picture} />
        <div className="container">
          {this.state.loggedIn ? (
            <div>
              {this.props.children}
            </div>
          ) : (
            <div className="jumbotron">
              <h1>LunchWave landing page</h1>
              <p>Bacon ipsum dolor amet flank tongue nulla chuck in eu ball tip reprehenderit ut pariatur id landjaeger.
                Ground round doner ribeye, fugiat est cupidatat andouille. Pork loin spare ribs landjaeger t-bone meatloaf nulla.</p>
              <p>Tongue velit turkey veniam t-bone consequat. Nisi ground round est t-bone.</p>
              <p>
                <button type="button" className="btn btn-lg btn-primary">Useless Button »</button>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
