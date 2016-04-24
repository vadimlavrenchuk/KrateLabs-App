/**
 * Map
 */
import { isArray, isUndefined, uniqueId } from 'lodash'
import React from 'react'

export default class Map extends React.Component {

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

    this.state = { active: false }
  }

  componentDidMount() {
    // Create MapboxGL Map
    mapboxgl.accessToken = this.props.token

    const map = new mapboxgl.Map({
      container: this.props.id,
      style: this.props.style,
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      attributionControl: false
    })
    window.map = map
    this.setState({ active: true })
  }

  render() {
    const styles = {
      map: {
        height: '100%',
        width: '100%',
        position: 'absolute'
      }
    }
    return (
      <div
        id={ this.props.id }
        style={ styles.map }>
        { this.state.active && this.props.children }
      </div>
    )
  }
}
