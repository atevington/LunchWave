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
    auth.clientId().then((res) => {
      if (res.status === 200)
        this.setState({ clientId: res.data.googleClientId })
    })
  }

  handleSubmit(event) {
    if (event.tokenObj)
      auth.login(event.tokenObj, loggedIn => {
        if (!loggedIn) return this.setState({ error: true })

        this.props.router.replace('/order')
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
        <div></div>
      )
    else
      return (
        <GoogleLogin clientId={this.state.clientId}
          className="btn btn-default"
          buttonText="Login"
          onSuccess={this.handleSubmit.bind(this)}
          onFailure={this.handleSubmit.bind(this)}>
          <Icon name='google' style={{ color: '#4285f4' }}/>
          <span style={spanStyles}>Login</span>
        </GoogleLogin>
      )
  }
}

export default withRouter(Login)
