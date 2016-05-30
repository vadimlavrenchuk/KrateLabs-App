import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Price extends Component {
  render() {
    let style = {
      textAlign: 'center',
      color: 'white',
      backgroundColor: store.tiel,
      padding: '15px',
      fontSize: '20px',
      marginTop: '25px',
      textShadow: `0 0 0.5em ${ store.grey }, 0 0 0.5em ${ store.grey }`,
    }
    return (
      <div style={ style }>
        <small>Total:</small> ${ store.price }
      </div>
    )
  }
}
