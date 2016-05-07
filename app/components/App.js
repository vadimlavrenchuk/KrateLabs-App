"use strict"

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
  BoundingBox } from '../components'

@observer
export default class App extends Component {
  constructor(props) {
    super(props)
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
        paddingBottom: '50px'
      }
    }
    return (
      <Grid fluid={true} className={ 'background' } style={ styles.container }>
        <Row style={styles.row}>

          { /* Map */ }
          <Col xs={12} sm={8} md={9} lg={10} style={ styles.left }>
            <Map>
              <BoundingBox />
              <NorthArrow />
              <TitlView />
              <ZoomIn />
              <ZoomOut />
            </Map>
            <Search />
            <Logo />
          </Col>

          { /* Options */ }
          <Col xs={12} sm={4} md={3} lg={2} style={styles.right}>
            <Options />
            <Checkout />
          </Col>
        </Row>
      </Grid>
    )
  }
}
