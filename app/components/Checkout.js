import React from 'react'
import { Input, Button } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'
import Shopify from '../utils/shopify'
import { product } from '../utils/kratelabs'

@observer
export default class Checkout extends React.Component {

  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleClick() {
    let apikey = '40676c7d883263065f21a0f02e926af4'
    let password = '1b94c846c093bee5ef1a14a65e066450'
    const shopify = new Shopify(apikey, password)

    shopify.createProduct(product(store.search))
      .then(product => console.log(product))
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
      </div>
    )
  }
}
