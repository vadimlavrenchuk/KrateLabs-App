import React from 'react'
import classNames from 'classnames'
import { Input, Button, ButtonGroup, Grid, Row, Col } from 'react-bootstrap'

export default class Options extends React.Component {

  static defaultProps = { }

  constructor(props) {
    super(props)
    this.state = {
      orientation: 1,
      canvas: 2,
      size: 2,
      validEmail: false
    }
    this.handleClickOrientation = this.handleClickOrientation.bind(this)
    this.handleClickCanvas = this.handleClickCanvas.bind(this)
    this.handleClickSize = this.handleClickSize.bind(this)
    this.defaults = {
      canvas: {
        1: 'Paper',
        2: 'Acrylic',
        3: 'Metal'
      },
      size: {
        1: {1: '24"x18"', 2: '18"x24"'},
        2: {1: '36"x24"', 2: '24"x36"'},
        3: {1: '42"x36"', 2: '36"x42"'},
      },
      orientation: {
        1: 'Landscape',
        2: 'Potrait'
      }
    }

  }

  getPrice() {
    let basePrice = 280
    let price = basePrice

    // Size
    if (this.state.size == 1) { price = price * 0.6 }
    else if (this.state.size == 2) { price = price * 1 }
    else if (this.state.size == 3) { price = price * 1.4 }

    // Canvas
    if (this.state.canvas == 1) { price = price * 0.4 }
    else if (this.state.canvas == 2) { price = price * 1 }
    else if (this.state.canvas == 3) { price = price * 2 }

    return price
  }

  handleClickOrientation(event) {
    this.setState({ orientation: event })
    this.props.handleOrientation(event)
  }

  handleClickSize(event) {
    this.setState({ size: event })
  }

  handleClickCanvas(event) {
    this.setState({ canvas: event })
  }

  render() {
    const styles = {
      container: {
        textAlign: 'center'
      },
      title: {
        paddingTop: '30px'
      }
    }
    let buttonOn = 'success'
    let buttonOff = 'info'

    return (
      <Grid fluid={true} style={ styles.container }>
        <Row>
          <h1>Options</h1>

          { /* Page Orientation */ }
          <h3>Orientation</h3>
          <Col xs={6}>
            <Button
              bsStyle={ this.state.orientation == 1 ? 'danger' : buttonOff }
              onClick={ () => this.handleClickOrientation(1) }
              block>Landscape</Button>
          </Col>
          <Col xs={6}>
            <Button
              bsStyle={ this.state.orientation == 2 ? 'danger' : buttonOff }
              onClick={ () => this.handleClickOrientation(2) }
              block>Potrait</Button>
          </Col>

          { /* Layout Size */ }
          <h3 style={ styles.title }>Layout Size</h3>
          <Col xs={4}>
            <Button
              bsStyle={ this.state.size == 1 ? buttonOn : buttonOff }
              onClick={ () => this.handleClickSize(1) }
              block>{ this.defaults.size[1][this.state.orientation] }</Button>
          </Col>
          <Col xs={4}>
            <Button
              bsStyle={ this.state.size == 2 ? buttonOn : buttonOff }
              onClick={ () => this.handleClickSize(2) }
              block>{ this.defaults.size[2][this.state.orientation] }</Button>
          </Col>
          <Col xs={4}>
            <Button
              bsStyle={ this.state.size == 3 ? buttonOn : buttonOff }
              onClick={ () => this.handleClickSize(3) }
              block>{ this.defaults.size[3][this.state.orientation] }</Button>
          </Col>

          { /* Canvas Type */ }
          <h3 style={ styles.title }>Canvas Type</h3>
          <Col xs={4}>
            <Button
              bsStyle={ this.state.canvas == 1 ? buttonOn : buttonOff }
              onClick={ () => this.handleClickCanvas(1) }
              block>Paper</Button>
          </Col>
          <Col xs={4}>
            <Button
              bsStyle={ this.state.canvas == 2 ? buttonOn : buttonOff }
              onClick={ () => this.handleClickCanvas(2) }
              block>Acrylic</Button>
          </Col>
          <Col xs={4}>
            <Button
              bsStyle={ this.state.canvas == 3 ? buttonOn : buttonOff }
              onClick={ () => this.handleClickCanvas(3) }
              block>Metal</Button>
          </Col>

          { /* Price */ }
        </Row>
        <Row className={ 'price' }>
          <Col xs={12}>
            <h3>Total Cost</h3>
            <h1>${ this.getPrice() }</h1>
          </Col>
        </Row>
      </Grid>
    )
  }
}
