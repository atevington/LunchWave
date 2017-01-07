import React, { PropTypes } from 'react'

import Photo from './Photo'
import Login from './Login'

const Navbar = ({ picture, userName }) => (
  <nav className="navbar navbar-fixed-top navbar-default">
    <span className="navbar-brand">LunchWave</span>
    <div className="pull-right navbar-text navbar-profile">
      {userName ? (
        <Photo picture={picture} userName={userName} />
      ) : (
        <Login />
      )}
    </div>
  </nav>
)

Navbar.propTypes = {
  userName: PropTypes.string,
  picture: PropTypes.string
}

export default Navbar
