import React from 'react'
import classNames from 'classnames'
import { Button, ButtonGroup } from 'react-bootstrap'

export default class Options extends React.Component {

  static defaultProps = { }

  constructor(props) {
    super(props)
  }

  render() {
    let styles = {
      container: {
        textAlign: 'center'
      }
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
            bsStyle={ store.orientation == 1 ? 'danger' : buttonOff }
            onClick={ () => store.orientation = 1 }>
            Landscape
          </Button>
          <Button
            bsStyle={ store.orientation == 2 ? 'danger' : buttonOff }
            onClick={ () => store.orientation = 2 }>
            Portrait
          </Button>
        </ButtonGroup>

        { /* Layout Size */ }
        <h3>Layout Size</h3>
        <ButtonGroup bsSize={ buttonSize }>
          <Button
            bsStyle={ store.size == 1 ? buttonOn : buttonOff }
            onClick={ () => store.size = 1 }>
            { this.defaults.size[1][store.orientation] }
          </Button>
          <Button
            bsStyle={ store.size == 2 ? buttonOn : buttonOff }
            onClick={ () => store.size = 2 }>
            { this.defaults.size[2][store.orientation] }
          </Button>
          <Button
            bsStyle={ store.size == 3 ? buttonOn : buttonOff }
            onClick={ () => store.size = 3 }>
            { this.defaults.size[3][store.orientation] }
          </Button>
        </ButtonGroup>

        { /* Material Type */ }
        <h3>Material Type</h3>
        <ButtonGroup bsSize={ buttonSize }>
          <Button
            bsStyle={ store.material == 1 ? buttonOn : buttonOff }
            onClick={ () => store.material = 1 }>
            Paper
          </Button>
          <Button
            bsStyle={ store.material == 2 ? buttonOn : buttonOff }
            onClick={ () => store.material = 2) }>
            Acrylic
          </Button>
          <Button
            bsStyle={ store.material == 3 ? buttonOn : buttonOff }
            onClick={ () => store.material = 3) }>
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
