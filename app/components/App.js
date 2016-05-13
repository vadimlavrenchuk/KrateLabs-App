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
  Basemap,
  BoundingBox,
  Price,
  URLHandler } from '../components'

@observer
export default class App extends Component {
  constructor(props) {
    super(props)

    // Store all URL Queries into MobX Store
    Object.keys(props.location.query).map((key) => {
      store[key] = props.location.query[key]
    })

    // Store all URL Params into MobX Store
    Object.keys(props.params).map((key) => {
      store[key] = props.params[key]
    })
  }

  render() {
    const styles = {
      'container': {
        backgroundColor: store.grey
      },
      'left': {
        height: store.height,
        padding: 0,
        margin: 0,
        overflow: 'hidden'
      },
      'right': {
        overflowY: 'auto',
        padding: 0,
        height: store.height,
        paddingBottom: '50px'
      }
    }
    return (
      <Grid fluid={ true } style={ styles.container }>
        <Row style={ styles.row }>

          { /* App */ }
          <URLHandler />

          { /* Map */ }
          <Col xs={12} sm={8} md={8} lg={9} style={ styles.left }>
            <Map>
              <NorthArrow />
              <TitlView />
              <ZoomIn />
              <ZoomOut />
              <Basemap />
              <Search />
            </Map>
            <Logo />
          </Col>

          { /* Options */ }
          <Col xs={12} sm={4} md={4} lg={3} style={ styles.right }>
            <Options />
            <Price />
            <Checkout />
          </Col>
        </Row>
      </Grid>
    )
  }
}
