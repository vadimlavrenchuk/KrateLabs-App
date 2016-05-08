import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class URLHandler extends React.Component {

  componentWillReact() {
    hashHistory.push(`/${ store.zoom }/${ store.lat }/${ store.lng }/${ store.bearing }/${ store.pitch }/${ store.orientation }/${ store.size }/${ store.material }`)
  }

  render() {
    store.lat
    store.lng
    store.zoom
    store.bearing
    store.pitch
    store.orientation
    store.size
    store.material
    return <div></div>
  }
}
