import mapboxgl from 'mapbox-gl'
import React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'

function fixLongitude(lng) {
  // Positive
  if (lng > 180) {
    // West
    if (Math.floor(Math.abs(lng) / 180 % 2) == 1) {
      return -180 + lng % 180
    }
    // East
    else {
      return lng % 180
    }
  }
  // Negative
  else if (lng < -180) {
    // West
    if (Math.floor(Math.abs(lng) / 180 % 2) == 1) {
      return 180 + lng % 180
    }
    // East
    else {
      return lng % 180
    }
  }
  return lng
}

@observer
export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
    this.handleMove = this.handleMove.bind(this)
  }

  componentDidMount() {
    mapboxgl.accessToken = store.token
    if (!mapboxgl.supported()) {
        console.log('WARNING: Your browser is not officailly supported by Mapbox GL');
    }
    const map = new mapboxgl.Map({
      container: store.mapId,
      style: store.styleTable[store.style],
      center: [store.lng, store.lat],
      bearing: store.bearing,
      pitch: store.pitch,
      zoom: store.zoom,
      attributionControl: false
    })
    window.map = map
    this.setState({ active: true })
    map.on('moveend', this.handleMove)
  }

  handleMove(e) {
    store.zoom = map.getZoom().toPrecision(3)
    store.center = map.getCenter()
    store.lat = store.center.lat.toPrecision(6)
    store.lng = fixLongitude(store.center.lng).toPrecision(6)
    store.pitch = Math.floor(map.getPitch())
    store.bearing = Math.floor(map.getBearing())
  }

  render() {
    const styles = {
      map: {
        width: '100%',
        bottom: '0px',
        top: '0px',
        position: 'absolute',
        margin: 0
      }
    }
    return (
      <div
        id={ store.mapId }
        style={ styles.map }>
        { this.state.active && this.props.children }
      </div>
    )
  }
}
