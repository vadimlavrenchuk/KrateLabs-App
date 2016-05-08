import 'isomorphic-fetch'
import {Promise} from 'es6-promise'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Input, Grid, Row, Col, Button } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'
import {
  Map,
  Logo,
  Search,
  getBounds,
  NorthArrow,
  TitlView,
  ZoomIn,
  ZoomOut,
  Options,
  Checkout,
  BoundingBox,
  URLHandler } from '../components'

@observer
export default class App extends Component {
  constructor(props) {
    super(props)

    if (props.params.zoom) { store.zoom = props.params.zoom }
    if (props.params.lat) { store.lat = props.params.lat }
    if (props.params.lng) { store.lng = props.params.lng }
    if (props.params.bearing) { store.bearing = props.params.bearing }
    if (props.params.pitch) { store.pitch = props.params.pitch }
    if (props.params.orientation) { store.orientation = props.params.orientation }
    if (props.params.size) { store.size = props.params.size }
    if (props.params.material) { store.material = props.params.material }
  }

  render() {
    const styles = {
      'container': {
      },
      'left': {
        height: store.height,
        padding: 0,
        margin: 0
      },
      'right': {
        overflowY: 'auto',
        padding: 0,
        height: store.height,
        paddingBottom: '50px'
      }
    }
    return (
      <Grid fluid={true} className={ 'background' } style={ styles.container }>
        <Row style={styles.row}>

          { /* Map */ }
          <Col xs={12} sm={8} md={8} lg={9} style={ styles.left }>
            <Map>
              <BoundingBox />
              <NorthArrow />
              <TitlView />
              <ZoomIn />
              <ZoomOut />
              <URLHandler />
            </Map>
            <Search />
            <Logo />
          </Col>

          { /* Options */ }
          <Col xs={12} sm={4} md={4} lg={3} style={styles.right}>
            <Options />
            <Checkout />
          </Col>
        </Row>
      </Grid>
    )
  }
}
