"use strict"
import React from 'react'
import { Input, Button, ButtonGroup } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'
import { formatPayload } from '../utils/addxy'
import { product } from '../utils/kratelabs'
import { Promise } from 'es6-promise'
import 'isomorphic-fetch'


@observer
export default class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      svg: ''
    }
  }

  handleClick() {
    let url = `https://api.kratelabs.addxy.com/product`
    let payload = {
      access_token: store.token,
      lat: store.lat,
      lng: store.lng,
      zoom: store.zoom,
      bearing: store.bearing,
      pitch: store.pitch,
      email: store.email,
      name: store.search ? store.search : 'Custom Product'
    }
    let options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/x-www-form-urlencoded",
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      },
      body: formatPayload(payload),
    }
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        store.svg = data.svg
        store.png = data.png
      })
  }

  handleKeyDown(e) {
    if (e.key == 'Enter') this.handleClick()
  }

  render() {
    const styles = {
      container: {
        textAlign: 'center',
        padding: '20px',
      },
      title: {
        color: '#E6E6DD',
        textTransform: 'none',
        fontWeight: 'normal',
        fontFamily: '"AlteHaasGrotesk", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }
    }

    return (
      <div style={ styles.container }>
        <h3 style={ styles.title }>Checkout</h3>
        <Input
          bsSize="large"
          type="text"
          value={ store.email }
          placeholder="Enter email"
          hasFeedback
          bsStyle={ store.emailValid ? 'success' : 'error' }
          groupClassName="group-class"
          labelClassName="label-class"
          onKeyDown={ this.handleKeyDown }
          onChange={ (e) => store.email = e.target.value }
        />
        <Button
          bsStyle={ store.emailValid ? 'danger' : 'default' }
          disabled={ !store.emailValid }
          onClick={ this.handleClick }>
          Add to Cart
        </Button>
        { store.svg &&
        <div>
          <br />
          <ButtonGroup bsSize={'small'}>
            <Button
              bsStyle={ 'info' }
              href={ store.svg }
              onClick={ () => console.log(store.svg) }>
              SVG
            </Button>
            <Button
              bsStyle={ 'info' }
              href={ store.png }
              onClick={ () => console.log(store.png) }>
              PNG
            </Button>
          </ButtonGroup>
        </div>
        }
      </div>
    )
  }
}
