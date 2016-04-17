import React from 'react'
import { Input } from 'react-bootstrap'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.state = {
      value: ''
    }
  }

  validationState() {
    let length = this.state.value.length
    if (length > 10) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
  }

  getLocation(location) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${ location }`
    fetch(url).then(response => response.json())
      .then(data => this.setState({ locations: data }))
      .catch(error => console.log("Error found"))
  }

  handleChange() {
    let value = this.refs.input.getValue()
    this.getLocation(value)
    this.setState({value: value})
  }

  render() {
    const styles = {}
    return (
      <div>
        <Input
          bsSize="large"
          type="text"
          value={ this.state.value }
          placeholder="Choose a city..."
          bsStyle={ this.validationState() }
          hasFeedback
          ref="input"
          groupClassName="group-class"
          labelClassName="label-class"
          onChange={ this.handleChange }
        />
        { this.state.locations && this.state.locations.results[0].formatted_address }
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
