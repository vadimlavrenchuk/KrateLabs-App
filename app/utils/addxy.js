import { variants, options, product } from './kratelabs'

export function formatPayload(payload) {
  let data = []
  Object.keys(payload).map((key) => {
    data.push(`${ key }=${ payload[key] }`)
  })
  return data.join('&')
}


export default class Addxy {
  constructor() {
    this.headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': "application/x-www-form-urlencoded",
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
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
