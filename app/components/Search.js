import React from 'react'
import classNames from 'classnames'
import { Input, Button } from 'react-bootstrap'
import { torontoGeometry } from './utils'
import { observer } from 'mobx-react'
import { store } from '../store'
import { Result } from '../components'

@observer
export default class Search extends React.Component {
  static defaultProps = {
    left: '20%',
    right: '20%',
    top: 35,
    zIndex: 30,
    geometry: torontoGeometry
  }

  constructor(props) {
    super(props)
    this.getLocation = this.getLocation.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      hover: false
    }
  }

  handleMouseEnter() {
    this.setState({ hover: true })
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }

  getLocation(location) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${ location }`
    fetch(url).then(response => response.json())
      .then(data => {
        let result = data.results[0]
        console.log(result)
        this.setState({
          'results': result,
          'formatted_address': result.formatted_address,
          'geometry': result.geometry
        })
      })
      .catch(error => console.log("Error found"))
  }

  handleClick() {
    console.log('hey')
  }

  handleKeyDown(e) {
    if (e.key == 'Enter') this.handleClick()
  }

  handleChange(e) {
    store.search = e.target.value
    store.results = ['Paris, France', 'New York City', 'San Francisco']
    console.log(store.search)
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        bottom: this.props.bottom,
        top: this.props.top,
        left: this.props.left,
        right: this.props.right,
        zIndex: this.props.zIndex,
      },
      search: {
        fontFamily: 'fledgling',
        border: 'none',
        color: 'white',
        borderBottom: 'grey',
        borderBottomStyle: 'dashed',
        borderBottomWidth: 'thin',
        fontSize: '7em',
        outline: 'none',
        backgroundColor: 'transparent',
        transition: 'none',
        fontWeight: 'bold',
        WebKitTransition: 'none',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
      }
    }

    return (
      <div style={ styles.container }>
        <input
          bsSize="large"
          type="text"
          bsStyle="link"
          ref="search"
          style={ styles.search }
          value={ store.value }
          className={ 'search' }
          bsStyle='default'
          placeholder="Choose a city..."
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
        />
        { store.results.map((result, index) =>
          <Result key={ index }>{ result }</Result>
        )}
      </div>
    )
  }
}
