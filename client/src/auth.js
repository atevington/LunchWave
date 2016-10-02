import request from 'superagent'

module.exports = {

  login(token, cb) {
    var id_token = token
      ? token.id_token
      : null || localStorage.id_token

    cb = arguments[arguments.length - 1]

    // sanity check and escape
    if (!id_token) {
      this.logout()
      return
    }

    localStorage.id_token = id_token
    const user = this.userInfo(id_token)

    // return some good news
    if (cb) cb(true, user)
    this.onChange(true, user)
  },

  logout(cb) {
    delete localStorage.id_token
    if (cb) cb(false)
    this.onChange(false)
  },

  clientId() {
    return request.get('/api/appinfo')
      .end((err, res) => res.body.googleClientId)
  },

  loggedIn() { return !!localStorage.id_token },

  userInfo(id_token) {
    const payload = JSON.parse(
      new Buffer(id_token.split('.')[1], 'base64').toString()
    )

    return {
      name: payload.given_name,
      picture: payload.picture
    }
  },

  onChange() {}
}
