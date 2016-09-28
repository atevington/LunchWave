import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login-component';
import { CLIENT_ID } from '../constants/client.constants';

export default class Login extends Component {
  responseGoogle(res) {
    var id_token = res.getAuthResponse().id_token;

    console.log('token: ', id_token );

    // anything else you want to do (save to localStorage)...
  }

  render () {
    return (
      <div>
        <GoogleLogin socialId={ CLIENT_ID }
          class="ui button google-login"
          scope="profile"
          responseHandler={ this.responseGoogle }
          buttonText="Google Login"/>
      </div>
    );
  }
}
