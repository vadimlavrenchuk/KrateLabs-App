import 'isomorphic-fetch'
import base64 from 'base-64'
import utf8 from 'utf8'
import FormData from 'form-data'

function encodeAccount(username, password) {
  let bytes = utf8.encode(`${ username }:${ password }`)
  return base64.encode(bytes)
}

function loadFormData(payload) {
  if (!payload) return undefined
  let data = new FormData()
  Object.keys(payload).map((key) => {
    data.append(key, payload[key])
  })
  return data
}

function loadFormUrlencoded(payload) {
  if (!payload) return undefined
  let data = []
  Object.keys(payload).map((key) => {
    data.push(`${ key }=${ JSON.stringify(payload[key]) }`)
  })
  return data.join('&')
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    return response
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  let contentType = response.headers.get('content-type')
  if (contentType.match(/application\/json/)) return response.json()
  return response.text()
}

function request({ url, method='get', endpoint, payload, params, authentication } = {}) {
  if (endpoint) url += `${ endpoint }`
  if (params) url += `?${ loadFormUrlencoded(params) }`
  if (authentication.username && authentication.password) authentication = `Basic ${ encodeAccount(authentication.username, authentication.password) }`

  let headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Authorization': authentication
  })
  let options = {
    headers: headers,
    method: method,
    mode: 'cors',
    body: JSON.stringify(payload)
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

export default class Request {
  static get(options) {
    return request({ method: 'get', ...options })
  }
  static post(options) {
    return request({ method: 'post', ...options })
  }
  static put(options) {
    return request({ method: 'put', ...options })
  }
  static delete(options) {
    return request({ method: 'delete', ...options })
  }
}

if (require.main === module) {
  let options = {
    url: 'https://api.kratelabs.addxy.com/token',
    payload: {
      grant_type: 'client_credentials',
      email: 'carriere.denis@gmail.com'
    },
    authentication: {
      username: 'Kratelabs',
      password: 'Kratelabs'
    }
  }
  Request.post(options)
    .then(
      data => console.log(data),
      error => console.log(error)
    )
}
