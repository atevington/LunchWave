import React, { Component } from 'react'
import { withRouter } from 'react-router'
import GoogleLogin from 'react-google-login'
import { Icon } from 'react-fa'

import auth from '../auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    auth.clientId().then((res) => {
      if (res.status === 200)
        this.setState({ clientId: res.data.googleClientId })
    })
  }

  handleSubmit(event) {
    if (event.tokenObj)
      auth.login(event.tokenObj, loggedIn => {
        if (loggedIn) {
          this.props.router.replace('/')
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

export default withRouter(Login)
