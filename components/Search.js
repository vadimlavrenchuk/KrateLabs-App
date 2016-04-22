import React from 'react'
import { Input, Button } from 'react-bootstrap'
import { torontoGeometry } from './utils'

export default class Search extends React.Component {

  static defaultProps = {
    left: '20%',
    right: '20%',
    top: 50,
    zIndex: 30,
    geometry: torontoGeometry
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      value: '',
      formatted_address: 'Toronto, ON',
      geometry: this.props.geometry
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
    this.props.onClick(this.state.geometry)
  }

  handleKeyDown(e) {
    if (e.key == 'Enter') this.handleClick()
  }

  handleChange() {
    let value = this.refs.input.getValue()
    if (value.length > 2) this.getLocation(value)
    this.setState({value: value})
  }

  render() {
    const styles = {
      text: {
        fontSize: '1.5em'
      },
      textBox: {
        textAlign: 'center',
        padding: 0
      },
      input: {
        position: 'absolute',
        bottom: this.props.bottom,
        top: this.props.top,
        left: this.props.left,
        right: this.props.right,
        zIndex: this.props.zIndex
      }
    }

    return (
      <div style={ styles.input }>
        <Input
          bsSize="large"
          type="text"
          value={ this.state.value }
          placeholder="Choose a city..."
          hasFeedback
          ref="input"
          groupClassName="group-class"
          labelClassName="label-class"
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
        />
        <div style={ styles.textBox }>
          <Button style={ styles.text } onClick={ this.handleClick }>
            { this.state.formatted_address }
          </Button>
        </div>
      </div>
    )
  }
}
