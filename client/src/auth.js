import request from 'superagent'

const expired = () => localStorage.expires_at < Date.now()

module.exports = {

  login(token, cb) {
    var id_token = token
      ? token.id_token
      : null || localStorage.id_token

    cb = arguments[arguments.length - 1]

    if (token) localStorage.expires_at = token.expires_at

    // sanity check and escape
    if (expired() || !id_token) {
      if (cb) cb(false)
      this.onChange(false)
      return
    }

    // authenticate with the server
    this.authenticateUser(id_token, cb)
  },

  authenticateUser(id_token, cb) {
    request.get('/api/user')
      .set('X-Google-Token', id_token)
      .end((err, res) => {
        if (res.status === 200) {
          // store the token and expiration for another time
          localStorage.id_token = id_token

          // return some good news
          if (cb) cb(true)
          this.onChange(true)
        }
        // nope
        else if (res.status === 401) {
          if (cb) cb(false)
          this.logout()
        }
      })
  },

  logout(cb) {
    delete localStorage.id_token
    delete localStorage.expires_at
    if (cb) cb()
    this.onChange(false)
  },

  getClientId: () => request.get('/api/appinfo').end((err, res) => {
    return res.body.googleClientId
  }),

  loggedIn: () => !!localStorage.id_token,

  onChange() {}
}
