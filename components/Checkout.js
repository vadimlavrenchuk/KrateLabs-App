import React from 'react'
import { Input, Button, Grid, Row, Col } from 'react-bootstrap'
import validator from 'validator'


export default class Checkout extends React.Component {

  static defaultProps = { }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isEmail: false
    }
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
    let value = this.refs.input.getValue()
    this.setState({
      value: value,
      isEmail: validator.isEmail(value)
    })
  }

  render() {
    const styles = {
      container: {
        textAlign: 'center',
        color: 'white'
      },
      title: {
        paddingTop: '50px'
      }
    }

    return (
      <Grid fluid={ true } style={ styles.container }>
        <Row>
          <h1>Checkout</h1>
          <Col xs={12}>
            <Input
              bsSize="large"
              type="text"
              value={ this.state.value }
              placeholder="Enter email"
              hasFeedback
              ref="input"
              bsStyle={ this.state.isEmail ? 'success' : 'error' }
              groupClassName="group-class"
              labelClassName="label-class"
              onKeyDown={ this.handleKeyDown }
              onChange={ this.handleChange }
            />
            <Button
              bsSize='large'
              disabled={ !this.state.isEmail }
              onClick={ this.handleClick }>
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}
