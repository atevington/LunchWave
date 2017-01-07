import { getToken, setToken } from './token'
import { request } from './util'

module.exports = {

  login(token, cb) {
    const id_token = token
      ? token.id_token
      : getToken() || null

    cb = arguments[arguments.length - 1]

    // sanity check and escape
    if (!id_token) {
      this.logout()
      return
    }

    const expiration = this.userInfo(id_token).expiration * 1000

    // did the token expire?
    if (expiration < new Date().getTime()) {
      this.logout()
      return
    }

    setToken(id_token)
    request.defaults.headers['X-Google-Token'] = getToken()

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
    return request.get('appinfo')
  },

  loggedIn() { return !!getToken() },

  userInfo(id_token) {
    const payload = JSON.parse(
      new Buffer(id_token.split('.')[1], 'base64').toString()
    )

    return {
      name: payload.given_name,
      picture: payload.picture,
      expiration: payload.exp
    }
  },

  onChange() {}
}
