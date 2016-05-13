import React from 'react'
import { Input, Button } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Checkout extends React.Component {

  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleClick() {
    console.log('Connect to Shopify API')
  }

  handleKeyDown(e) {
    if (e.key == 'Enter') this.handleClick()
  }

  render() {
    const styles = {
      container: {
        textAlign: 'center',
        padding: '20px'
      }
    }

    return (
      <div style={ styles.container }>
        <h3>Checkout</h3>
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
