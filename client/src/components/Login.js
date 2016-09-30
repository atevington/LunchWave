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
    // grab the clientId from the appinfo for the login button
    auth.clientId().end((err, res) => {
      if (res.status === 200)
        this.setState({ clientId: res.body.googleClientId })
    })
  }

  handleSubmit(event) {
    if (event.tokenObj)
      auth.login(event.tokenObj, (loggedIn) => {
        if (!loggedIn)
          return this.setState({ error: true })

        const { location } = this.props

        if (location.state && location.state.nextPathname)
          this.props.router.replace(location.state.nextPathname)
        else
          this.props.router.replace('/')
      })
  }

  render() {
    var spanStyles = {
      display: 'inline-block',
      textAlign: 'right',
      width: '3em'
    }

    if (!this.state.clientId)
      return (
        <div className="alert alert-warning">Awaiting connection...</div>
      )
    else
      return (
        <div>
          <GoogleLogin clientId={this.state.clientId}
            className="btn btn-danger"
            buttonText="Login"
            onSuccess={this.handleSubmit.bind(this)}
            onFailure={this.handleSubmit.bind(this)}>
            <Icon name='google' />
            <span style={spanStyles}>Login</span>
          </GoogleLogin>
          {this.state.error && (
            <div className="alert alert-danger">Bad login information</div>
          )}
        </div>
      )
  }
}

export default withRouter(Login)
