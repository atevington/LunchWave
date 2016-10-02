import React from 'react'

import auth from '../auth.js'

const Photo = ({ picture, userName }) => {
  return (
    <span>
      <img src={picture} height="30" width="30" alt="profile" />
      <a href="/" onClick={auth.logout.bind(auth, null)}>Logout</a>
    </span>
  )
}

export default Photo
