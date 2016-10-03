import axios from 'axios'
import { getToken } from './token'

/*
 * setup an instance of axios with defaults
 * all xhr requests are off the baseURL
 * unless the url is absolute eg: '/notApi/users'
 */
const request = axios.create({
  baseURL: '/api/',
  headers: { 'X-Google-Token': getToken() }
})

export default request
