import request from 'superagent'

const expired = () => localStorage.expires_at < Date.now()

module.exports = {

  login(token, cb) {
    var id_token = token
      ? token.id_token
      : null || localStorage.id_token

    cb = arguments[arguments.length - 1]

    // sanity check and escape
    if (expired() || !id_token) {
      if (cb) cb(false)
      this.onChange(false)
      return
    }

    // are we authenticated?
    request.get('/api/user')
      .set('X-Google-Token', id_token)
      .end((err, res) => {
        // nope
        if (err) {
          if (cb) cb(false)
          this.logout()
          return
        }

        if (res.status === 200) {
          // store the token and expiration for another time
          localStorage.id_token = id_token
          localStorage.expires_at = token.expires_at

          // return some good news
          if (cb) cb(true)
          this.onChange(true)
        }
      })
  },

  logout(cb) {
    delete localStorage.id_token
    delete localStorage.expires_at
    if (cb) cb()
    this.onChange(false)
  },

  clientId: () => request.get('/api/appinfo')
    .end((err, res) => res.body.googleClientId),

  loggedIn: () => !!localStorage.id_token,

  onChange() {}
}
