import axios from 'axios'
import { getToken, deleteToken } from './token'

/*
 * setup an instance of axios with defaults
 * all xhr requests are off the baseURL
 * unless the url is absolute eg: '/notApi/users'
 */
const request = axios.create({
  baseURL: '/api/',
  headers: { 'X-Google-Token': getToken() }
})

const handleErr = (err) => {
  if (err.response && err.response.status === 401) {
    deleteToken()
    window.location.href = '/'
  }
}

export {
  request,
  handleErr
}
