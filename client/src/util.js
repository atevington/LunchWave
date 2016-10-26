import axios from 'axios'
import CancelToken from 'axios/lib/cancel/CancelToken'
import { getToken, deleteToken } from './token'

// for canceling promises
const source = CancelToken.source()

/*
 * setup an instance of axios with defaults
 * all xhr requests are off the baseURL
 * unless the url is absolute eg: '/notApi/users'
 */
const request = axios.create({
  baseURL: '/api/',
  headers: { 'X-Google-Token': getToken() },
  cancelToken: source.token,
  validateStatus: status => {
    return status >= 200 && status <= 404
  }
})

const handleErr = (err) => {
  if (err.response && err.response.status === 401) {
    deleteToken()
    window.location.href = '/'
  }
}

export {
  request,
  handleErr,
  source
}

