import React, { Component } from 'react'
import { withRouter } from 'react-router'

import GoogleLogin from 'react-google-login';
import { Icon } from 'react-fa';

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
    auth.getClientId().end((err, res) => {
      if (err) {
        console.log(err)
        return
      }

      // update state and force rerender to load google button
      this.setState({ clientId: res.body.googleClientId })
    })
  }

  handleSubmit(event) {
    const token = event.tokenObj

    if (!token) return

    auth.login(token, (loggedIn) => {
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
    var buttonStyles = {
      textAlign: 'left',
      background: '#ea4335',
      border: 'none',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5
    };

    var spanStyles = {
      display: 'inline-block',
      textAlign: 'right',
      width: 35
    };

    if (!this.state.clientId) {
      return (<div>Waiting on connection to server...</div>)
    }
    else {
      return (
        <div>
          <GoogleLogin clientId={this.state.clientId}
            buttonText="Login"
            onSuccess={this.handleSubmit.bind(this)}
            onFailure={this.handleSubmit.bind(this)}
            style={buttonStyles}>
            <Icon name='google' />
            <span style={ spanStyles }>Login</span>
          </GoogleLogin>
          {this.state.error && (<p>Bad login information</p>)}
        </div>
      );
    }
  }
}

export default withRouter(Login)
