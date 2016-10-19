import React, { Component } from 'react'
import { withRouter } from 'react-router'
import GoogleLogin from 'react-google-login'
import { Icon } from 'react-fa'

import auth from '../auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      clientId: null
    }
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
        if (!loggedIn) {
          return this.setState({ error: true })
        }
        else {
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
        onSuccess={this.handleSubmit.bind(this)}
        onFailure={this.handleSubmit.bind(this)}>
        <Icon name='google'/>
        <span className="login-text">Login</span>
      </GoogleLogin>
    )
  }
}

export default withRouter(Login)
