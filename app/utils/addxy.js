import 'isomorphic-fetch'
import 'whatwg-fetch'
import { Promise } from 'es6-promise'
import { variants, options, product } from './kratelabs'

export function formatPayload(payload) {
  let data = []
  Object.keys(payload).map((key) => {
    data.push(`${ key }=${ payload[key] }`)
  })
  return data.join('&')
}


export default class Addxy {
  headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': "application/x-www-form-urlencoded",
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  });

  constructor() {
  }

  formatFormData(payload) {
    let data = new FormData()
    Object.keys(payload).map((key) => {
      data.append(key, payload[key])
    })
    return data
  }

  checkStatus(response) {
    if (response.ok) {
      console.log('Connection OK')
      return response
    }
    throw new Error('Connection issue')
  }

  createProduct(payload) {
    return new Promise((resolve, reject) => {
      let url = `http://localhost:5000/product`
      let options = {
        method: 'post',
        headers: this.headers,
        mode: 'no-cors',
        body: this.formatPayload(payload),
        cache: 'default'
      }
      fetch(url, options)
        .then(this.checkStatus)
        .then(response => response.json())
        .then(data => resolve(data))
    })
  }
}

async function main() {
  let payload = {
    access_token: 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ',
    lat: 43.64305,
    lng: -79.37412,
    zoom: 12.0,
    bearing: 0,
    pitch: 0,
    email: 'test@email.com',
    name: 'Cool File'
  }
  const addxy = new Addxy()
  addxy.createProduct(payload)
    .catch(error => console.log(error))
    .then(product => console.log(product))
    .catch(error => console.log(error))
}
