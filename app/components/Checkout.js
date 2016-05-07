import React from 'react'
import { Input, Button, Grid, Row, Col } from 'react-bootstrap'

export default class Checkout extends React.Component {

  static defaultProps = { }

  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick() {
    console.log('Connect to Shopify API')
  }

  handleKeyDown(e) {
    if (e.key == 'Enter') this.handleClick()
  }

  handleChange(e) {
    store.email = this.refs.input.getValue()
  }

  render() {
    const styles = {
      container: {
        textAlign: 'center'
      },
      title: {
        paddingTop: '50px'
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
          ref="input"
          bsStyle={ store.emailValid ? 'success' : 'error' }
          groupClassName="group-class"
          labelClassName="label-class"
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
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
