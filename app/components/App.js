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

  componentWillReact() {
    console.log("I will re-render, since the height has changed!");
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
        backgroundColor: 'rgb(10, 20, 35)',
      },
      'left': {
        height: store.height,
        backgroundColor: 'rgb(170, 165, 142)',
        padding: 0,
        margin: 0
      },
      'topRight': {
        backgroundColor: 'rgb(10, 20, 35)',
        padding: 0,
        paddingBottom: '50px'
      },
      'bottomRight': {
        backgroundColor: 'rgb(10, 20, 35)',
        padding: 0,
        paddingBottom: '50px'
      }
    }
    return (
      <Grid fluid={true} style={ styles.container }>
        <Row style={styles.row}>
          { /* Map */ }
          <Col xs={12} sm={6} md={8} style={ styles.left }>
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
          <Col xs={12} sm={6} md={4} style={styles.topRight}>
            <Options handleOrientation={ this.handleOrientation } />
          </Col>

          { /* Checkout */ }
          <Col xs={12} sm={6} md={4} style={styles.bottomRight}>
            <Checkout />
          </Col>
        </Row>
      </Grid>
    )
  }
}
