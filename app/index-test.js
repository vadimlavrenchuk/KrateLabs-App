import React from 'react'
import { render } from 'react-dom'
import mapboxgl from 'mapbox-gl'
import { Button } from 'react-bootstrap'

class App extends React.Component {
  static defaultProps = {
    lat: 43.650128,
    lng: -79.382185,
    zoom: 12,
    id: 'map',
    token: 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ',
    style: 'mapbox://styles/addxy/cin9l0b8d0023b4noejyuc2r7'
  }
  constructor(props) {
    super(props)
    this.state = {height: '300px'}
  }

  componentDidMount() {
    // Create MapboxGL Map
    window.mapboxgl = mapboxgl
    mapboxgl.accessToken = this.props.token

    const map = new mapboxgl.Map({
      container: this.props.id,
      style: this.props.style,
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      attributionControl: false,
      repaint: true
    })
    window.map = map
    this.setState({ active: true })
  }

  render() {
    const styles = {
      map: {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        width: '100%',
        backgroundColor: 'grey'
      }
    }
    return (
      <div>
        <div
          id={ this.props.id }
          style={ styles.map }>
        </div>
        <Button onClick={ () => this.setState({height: '500px'}) }>Big</Button>
        <Button onClick={ () => this.setState({height: '300px'}) }>Small</Button>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
