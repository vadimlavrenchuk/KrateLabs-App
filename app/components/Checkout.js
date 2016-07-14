import React from 'react'
import { Input, Button, ButtonGroup } from 'react-bootstrap'
import { observer } from 'mobx-react'
import Request from '../utils/Request'
import { store } from '../store'
import { formatPayload } from '../utils/addxy'
import { product } from '../utils/kratelabs'

@observer
export default class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      active: false,
      error: false
    }
  }

  async handleClick() {
    this.setState({ active: true, error: false })
    let payload = {
      lat: store.lat,
      lng: store.lng,
      zoom: store.zoom,
      bearing: store.bearing,
      pitch: store.pitch,
      email: store.email,
      style: store.styleTable[1]
    }
    let authentication = {
      username: 'Kratelabs',
      password: 'Kratelabs'
    }
    let api_url = 'https://api.kratelabs.addxy.com'
    let token = await Request.post({
      url: `${ api_url }/token`,
      authentication: authentication,
      payload: {
        grant_type: 'client_credentials',
        email: store.email
      }
    }).then(
      data => data,
      error => { if (error) { this.setState({ active: false, error: true })}}
    )

    let product = await Request.post({
      url: `${ api_url }/product`,
      authentication: `Bearer ${ token.token }`,
      payload: payload
    }).then(
      data => data,
      error => { if (error) { this.setState({ active: false, error: true })}}
    )

    if (product.ok) window.location = `https://kratelabs.com/products/${ product.id }`
    else { this.setState({ active: false, error: true }) }
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
      },
      error: {
        padding: '5px',
        fontWeight: 'bold',
        color: 'rgb(237, 58, 58)'
      }
    }

    return (
      <div style={ styles.container }>
        <h3 style={ styles.title }>Create Product</h3>
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
        { !this.state.active &&
        <Button
          bsStyle={ store.emailValid ? 'danger' : 'default' }
          disabled={ !store.emailValid }
          onClick={ this.handleClick }>
          Add to Cart
        </Button>
        }
        { this.state.active &&
        <img src={ require('../images/loader.gif') } height="25px" alt="Loading..." />
        }
        { this.state.error &&
          <div style={ styles.error }>Internal Server Error</div>
        }
    </div>
    )
  }
}
