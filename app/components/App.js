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
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.handleOrientation = this.handleOrientation.bind(this)
    this.state = {
      orientation: 1
    }
  }

  handleOrientation(orientation) {
    this.setState({
      orientation: orientation
    })
  }

  handleSearchClick(geometry) {
    let bounds = getBounds(geometry)
    this.setState({
      geometry: geometry,
      bounds: bounds
    })
    window.map.fitBounds(bounds)
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
          <Col xs={12} sm={12} md={8} style={ styles.left }>
            <Map bounds={ this.state.bounds }>
              <BoundingBox orientation={ this.state.orientation }/>
              <NorthArrow />
              <TitlView />
              <ZoomIn />
              <ZoomOut />
            </Map>
            <Search onClick={ this.handleSearchClick }/>
            <Logo />
          </Col>

          { /* Options */ }
          <Col xs={12} sm={12} md={4} style={styles.right}>
            <Options handleOrientation={ this.handleOrientation } />
            <Checkout />
          </Col>
        </Row>
      </Grid>
    )
  }
}