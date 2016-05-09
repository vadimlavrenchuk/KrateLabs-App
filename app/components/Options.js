import React from 'react'
import classNames from 'classnames'
import { Button, ButtonGroup } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Options extends React.Component {

  static defaultProps = { }

  constructor(props) {
    super(props)
  }

  render() {
    let styles = {
      container: {
        textAlign: 'center'
      },
      price: {
        color: 'white',
        backgroundColor: store.tiel,
        padding: '15px',
        fontSize: '2em',
        marginTop: '25px',
        textShadow: `0 0 0.5em ${ store.grey }, 0 0 0.5em ${ store.grey }`,
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
            { store.sizeText(1) }
          </Button>
          <Button
            bsStyle={ store.size == 2 ? buttonOn : buttonOff }
            onClick={ () => store.size = 2 }>
            { store.sizeText(2) }
          </Button>
          <Button
            bsStyle={ store.size == 3 ? buttonOn : buttonOff }
            onClick={ () => store.size = 3 }>
            { store.sizeText(3) }
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
            onClick={ () => store.material = 2 }>
            Acrylic
          </Button>
          <Button
            bsStyle={ store.material == 3 ? buttonOn : buttonOff }
            onClick={ () => store.material = 3 }>
            Metal
          </Button>
        </ButtonGroup>
        { /* Price */ }
        <div style={ styles.price }>
          <small>Total:</small> ${ store.price }
        </div>
      </div>
    )
  }
}
