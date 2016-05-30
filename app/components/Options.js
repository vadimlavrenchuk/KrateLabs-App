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
        paddingTop: 50,
        textAlign: 'center'
      },
      title: {
        textTransform: 'none',
        fontWeight: 'normal',
        color: '#E6E6DD',
        fontFamily: '"AlteHaasGrotesk", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }
    }
    let buttonOn = 'success'
    let buttonOff = 'info'
    let buttonSize = ''

    return (
      <div style={ styles.container }>
        <h2 style={ styles.title }>Options</h2>

        { /* Page Orientation */ }
        <h4 style={ styles.title }>Orientation</h4>
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
        <h4 style={ styles.title }>Layout Size</h4>
        <ButtonGroup bsSize={ buttonSize }>
          <Button
            bsStyle={ store.size == 1 ? buttonOn : buttonOff }
            onClick={ () => store.size = 1 }>
            { store.sizeTable[1][store.orientation] }
          </Button>
          <Button
            bsStyle={ store.size == 2 ? buttonOn : buttonOff }
            onClick={ () => store.size = 2 }>
            { store.sizeTable[2][store.orientation] }
          </Button>
          <Button
            bsStyle={ store.size == 3 ? buttonOn : buttonOff }
            onClick={ () => store.size = 3 }>
            { store.sizeTable[3][store.orientation] }
          </Button>
        </ButtonGroup>

        { /* Material Type */ }
        <h4 style={ styles.title }>Material Type</h4>
        <ButtonGroup bsSize={ buttonSize }>
          <Button
            bsStyle={ store.material == 1 ? buttonOn : buttonOff }
            onClick={ () => store.material = 1 }>
            { store.materialTable[1] }
          </Button>
          <Button
            bsStyle={ store.material == 2 ? buttonOn : buttonOff }
            onClick={ () => store.material = 2 }>
            { store.materialTable[2] }
          </Button>
          <Button
            bsStyle={ store.material == 3 ? buttonOn : buttonOff }
            onClick={ () => store.material = 3 }>
            { store.materialTable[3] }
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}
