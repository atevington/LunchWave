import request from 'superagent'


const expired = () => localStorage.token > Date.now()

module.exports = {
  login(token, cb) {
    console.log(token)
    cb = arguments[arguments.length - 1]

    // TODO: rework this
    if (!token && localStorage.token && !expired()) {
      token = localStorage.token
    } else {
      if (cb) cb(false)
      this.onChange(false)
      console.log('no token')
      return
    }

    this.authenticateUser(token, cb)
  },

  authenticateUser(token, cb) {
    // authenticate with server using google JWT
    request.get('/api/user')
      .set('X-Google-Token', token.id_token)
      .end((err, res) => {
        if (res.body.id) {
          localStorage.token = token.id_token
          localStorage.expiration = token.expires_at

          if (cb) cb(true)
          this.onChange(true)
        } else {
          if (cb) cb(false)
          this.logout()
        }
      })
  },

  logout(cb) {
    delete localStorage.token
    delete localStorage.expiration
    if (cb) cb()
    this.onChange(false)
  },

  getClientId: () => request.get('/api/appinfo'),

  loggedIn: () => !!localStorage.token,

  onChange() {}
}
