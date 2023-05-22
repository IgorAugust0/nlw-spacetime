import axios from 'axios'
// define base url for api calls so the full url is not needed for each call only what comes after the base url
// see https://axios-http.com/docs/instance for more info
export const api = axios.create({
  baseURL: 'http://localhost:3333',
})
