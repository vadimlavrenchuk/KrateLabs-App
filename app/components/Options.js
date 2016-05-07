import React from 'react'
import classNames from 'classnames'
import { Input, Button, ButtonGroup, Grid, Row, Col } from 'react-bootstrap'

export default class Options extends React.Component {

  static defaultProps = { }

  constructor(props) {
    super(props)
    this.handleClickOrientation = this.handleClickOrientation.bind(this)
    this.handleClickMaterial = this.handleClickMaterial.bind(this)
    this.handleClickSize = this.handleClickSize.bind(this)
  }

  handleClickOrientation(event) {
    this.setState({ orientation: event })
    this.props.handleOrientation(event)
  }

  handleClickSize(event) {
    this.setState({ size: event })
  }

  handleClickMaterial(event) {
    this.setState({ material: event })
  }

  render() {
    const styles = {
      container: {
        textAlign: 'center'
      },
      title: {}
    }
    let buttonOn = 'success'
    let buttonOff = 'info'
    let buttonSize = ''

    return (
      <div style={ styles.container }>
        <h1>Options</h1>

        { /* Page Orientation */ }
        <h3>Orientation</h3>
        <ButtonGroup bsSize={ buttonSize }>
          <Button
            bsStyle={ this.state.orientation == 1 ? 'danger' : buttonOff }
            onClick={ () => this.handleClickOrientation(1) }>
            Landscape
          </Button>
          <Button
            bsStyle={ this.state.orientation == 2 ? 'danger' : buttonOff }
            onClick={ () => this.handleClickOrientation(2) }>
            Potrait
          </Button>
        </ButtonGroup>

        { /* Layout Size */ }
        <h3 style={ styles.title }>Layout Size</h3>
        <ButtonGroup bsSize={ buttonSize }>
          <Button
            bsStyle={ this.state.size == 1 ? buttonOn : buttonOff }
            onClick={ () => this.handleClickSize(1) }>
            { this.defaults.size[1][this.state.orientation] }
          </Button>
          <Button
            bsStyle={ this.state.size == 2 ? buttonOn : buttonOff }
            onClick={ () => this.handleClickSize(2) }>
            { this.defaults.size[2][this.state.orientation] }
          </Button>
          <Button
            bsStyle={ this.state.size == 3 ? buttonOn : buttonOff }
            onClick={ () => this.handleClickSize(3) }>
            { this.defaults.size[3][this.state.orientation] }
          </Button>
        </ButtonGroup>

        { /* Material Type */ }
        <h3 style={ styles.title }>Material Type</h3>
        <ButtonGroup bsSize={ buttonSize }>
          <Button
            bsStyle={ this.state.material == 1 ? buttonOn : buttonOff }
            onClick={ () => this.handleClickMaterial(1) }>
            Paper
          </Button>
          <Button
            bsStyle={ this.state.material == 2 ? buttonOn : buttonOff }
            onClick={ () => this.handleClickMaterial(2) }>
            Acrylic
          </Button>
          <Button
            bsStyle={ this.state.material == 3 ? buttonOn : buttonOff }
            onClick={ () => this.handleClickMaterial(3) }>
            Metal
          </Button>
        </ButtonGroup>
        { /* Price */ }
        <div className={ 'price' }>
          <h3>Total: <span>${ this.getPrice() }</span></h3>
        </div>
      </div>
    )
  }
}
