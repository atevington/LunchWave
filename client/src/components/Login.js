import React, { Component } from 'react';
//import { GoogleLogin } from 'react-google-login-component';
import GoogleLogin from 'react-google-login';
import { CLIENT_ID } from '../constants/client.constants';
import { Icon } from 'react-fa';

export default class Login extends Component {
  responseGoogle(res) {
    console.log(res);
  }

  render() {
    var googleLoginStyles = {
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

    return (
      <GoogleLogin clientId={ CLIENT_ID }
        buttonText="Login"
        onSuccess={ this.responseGoogle }
        onFailure={ this.responseGoogle }
        style={ googleLoginStyles }>
        <Icon name='google' />
        <span style={ spanStyles }>Login</span>
      </GoogleLogin>
    );
  }
}
