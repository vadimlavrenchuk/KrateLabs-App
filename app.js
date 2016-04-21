import React from 'react'
import { render } from 'react-dom'
import { Input, Grid, Row, Col, Button } from 'react-bootstrap'
import { Map, Logo, Search, getBounds, NorthArrow, TitlView, ZoomIn, ZoomOut } from './components'
import classNames from 'classnames'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.state = {
      maxHeight: window.innerHeight
    }
  }

  handleSearchClick(geometry) {
    this.setState({
      geometry: geometry,
      bounds: getBounds(geometry)
    })
  }

  render() {
    const styles = {
      'left': {
        height: this.state.maxHeight,
        backgroundColor: 'rgb(170, 165, 142)',
        padding: 0
      },
      'topRight': {
        height: this.state.maxHeight * 0.50,
        backgroundColor: 'rgb(80, 100, 142)',
        padding: 0
      },
      'bottomRight': {
        height: this.state.maxHeight * 0.50,
        backgroundColor: 'rgb(80, 165, 142)',
        padding: 0
      }
    }
    return (
      <Grid fluid={true}>
        <Row style={styles.row}>
          <Col xs={12} sm={6} md={8} style={styles.left}>
            <Map bounds={ this.state.bounds }>
              <NorthArrow />
              <TitlView />
              <ZoomIn />
              <ZoomOut />
            </Map>
            <Search onClick={ this.handleSearchClick }/>
            <Logo />
          </Col>
          <Col xs={12} sm={6} md={4} style={styles.topRight}><h1>Options</h1></Col>
          <Col xs={12} sm={6} md={4} style={styles.bottomRight}><h1>Checkout</h1></Col>
        </Row>
      </Grid>
    )
  }
}

render(<App />, document.getElementById('app'))
