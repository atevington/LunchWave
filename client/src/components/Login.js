import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { Icon } from 'react-fa'

import auth from '../auth'

class Login extends Component {
  state = { clientId: null }

  componentWillMount() {
    auth.clientId().then(({ status, data: { googleClientId } }) => {
      if (status === 200)
        this.setState({ clientId: googleClientId })
    })
  }

  handleSubmit = event => {
    if (event.tokenObj)
      auth.login(event.tokenObj, loggedIn => {
        if (loggedIn) {
          window.location.href = '/'
        }
      })
  }

  render() {
    if (!this.state.clientId) return null
    else return (
      <GoogleLogin clientId={this.state.clientId}
        className="btn btn-default btn-google"
        buttonText="Login"
        onSuccess={this.handleSubmit}
        onFailure={this.handleSubmit}>
        <Icon name='google'/>
        <span className="login-text">Login</span>
      </GoogleLogin>
    )
  }
}

export default Login
