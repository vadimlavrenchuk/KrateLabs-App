import React from 'react'
import { Input } from 'react-bootstrap'
import { Link } from 'react-router'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.state = {
      value: '',
      formatted_address: 'Toronto, ON'
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
          'results': data.results,
          'formatted_address': result.formatted_address,
          'northeast': result.geometry.bounds.northeast,
          'southwest': result.geometry.bounds.southwest,
          'lat': result.geometry.location.lat,
          'lng': result.geometry.location.lng
        })
      })
      .catch(error => console.log("Error found"))
  }

  handleChange() {
    let value = this.refs.input.getValue()
    this.getLocation(value)
    this.setState({value: value})
  }

  render() {
    const styles = {
      result: {
        filter: `drop-shadow(1.5px 1.5px 0px black) drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.60))`,
        WebkitFilter: `drop-shadow(1.5px 1.5px 0px black) drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.60))`,
        color: (this.state.hover) ? `rgb(102, 197, 218)` : `rgb(255, 255, 255)`,
        textAlign: 'center',
        textDecoration: 'none'
      }
    }
    return (
      <div>
        <Input
          bsSize="large"
          type="text"
          value={ this.state.value }
          placeholder="Choose a city..."
          hasFeedback
          ref="input"
          groupClassName="group-class"
          labelClassName="label-class"
          onChange={ this.handleChange }
        />
      <a href='/map' style={{ textDecoration: 'none' }}>
        <h1
          style={ styles.result }
          onMouseEnter={ this.handleMouseEnter }
          onMouseLeave={ this.handleMouseLeave }
        >
          { this.state.formatted_address }
        </h1>
      </a>
    </div>
  )}
}

Home.propTypes = {
  host: React.PropTypes.string
}

Home.defaultProps = {
  host: 'http://jsonplaceholder.typicode.com',
}

export default Home
