import React from 'react'
import { Link } from 'react-router'
import { Input } from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const styles = {
      'base': {
        padding: '10px',
        height: '100%',
        backgroundImage: `url(${ this.props.background })`,
        width: '700px',
        height: '480px',
        verticalAlign: 'middle',
        display: 'table-cell'
      }
    }
    return (
      <div style={ styles.base }>
        { this.props.children }
      </div>
    )
  }
}

App.propTypes = {
  background: React.PropTypes.string
}

App.defaultProps = {
  background: 'http://lorempixel.com/image_output/city-q-g-1021-480-4.jpg'
}

export default App
