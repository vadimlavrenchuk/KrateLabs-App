import React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class BoundingBox extends React.Component {
  render() {
    const styles = {
      container: {
        position: 'absolute',
        width: store.orientation == 1 ? '80%' : '50%',
        left:  store.orientation == 1 ? '10%' : '25%',
        height: store.orientation == 1 ? '50%' : '80%',
        top: store.orientation == 1 ? '25%' : '10%',
        zIndex: 5,
        border: '5px',
        borderStyle: 'solid',
        borderColor: '#FB7461',
        pointerEvents: 'none'
      }
    }
    return <div style={ styles.container }></div>
  }
}
