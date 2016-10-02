import React, { Component } from 'react'
//import { Link } from 'react-router'

import Photo from './Photo'
import Login from './Login'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-default">
        <span className="navbar-brand">LunchWave</span>
        <div className="pull-right navbar-text navbar-profile">
          {this.props.userName ? (
            <Photo picture={this.props.picture} userName={this.props.userName} />
          ) : (
            <Login />
          )}
        </div>
      </nav>
    )
  }
}
