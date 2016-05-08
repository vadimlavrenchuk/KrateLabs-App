import React from 'react'
import { Input } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'
import { Result } from '../components'
import { getBounds, getCenter } from './utils'

@observer
export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.getLocation = this.getLocation.bind(this)
    this.handleKeyEnter = this.handleKeyEnter.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getLocation(location) {
    let bounds = map.getBounds()
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${ location }&bounds=${ bounds._ne.lat },${ bounds._ne.lng }|${ bounds._sw.lat },${ bounds._sw.lng }`
    fetch(url).then(response => response.json())
      .then(data => {
        store.results = data.results.slice(0, 3)
      })
      .catch(error => console.log("Error found"))
  }

  handleKeyEnter(e) {
    let result = store.results[store.selected]
    if (result) {
      let bounds = getBounds(result.geometry)
      let center = getCenter(result.geometry)
      if (bounds) map.fitBounds(bounds)
      else if (center) map.flyTo({center: center, zoom: 13})
    }
  }

  handleKeyDown(e) {
    if (e.key == 'Enter') this.handleKeyEnter()
    if (e.key == 'ArrowDown') store.selected = Math.min(store.results.length, store.selected + 1)
    if (e.key == 'ArrowUp') store.selected = Math.max(0, store.selected - 1)
  }

  handleChange(e) {
    store.selected = 0
    store.search = e.target.value
    if (store.search) this.getLocation(store.search)
    else store.results = []
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        left: '20%',
        right: '20%',
        width: '60%',
        top: 25,
        zIndex: 30,
      },
      search: {
        fontFamily: 'fledgling',
        border: 'none',
        color: 'white',
        borderBottom: 'grey',
        borderBottomStyle: 'dashed',
        borderBottomWidth: 'thin',
        fontSize: '6em',
        outline: 'none',
        backgroundColor: 'transparent',
        transition: 'none',
        fontWeight: 'bold',
        width: '100%',
        WebKitTransition: 'none',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
      }
    }

    return (
      <div style={ styles.container } block>
        <input
          bsSize="large"
          type="text"
          bsStyle="link"
          ref="search"
          style={ styles.search }
          value={ store.search }
          className={ 'search' }
          bsStyle='default'
          placeholder="Choose a city..."
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
          block
        />
        { store.results.map((result, index) =>
          <Result key={ result.place_id } index={ index } json={ result } />
        )}
      </div>
    )
  }
}
