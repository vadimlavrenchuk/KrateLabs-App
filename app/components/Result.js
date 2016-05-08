import React from 'react'
import classNames from 'classnames'
import { Input, Button } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Result extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      hover: false
    }
  }

  handleClick() {
    console.log('Hello')
  }

  handleMouseEnter() {
    this.setState({ hover: true })
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }

  render() {
    const styles = {
      result: {
        fontFamily: 'fledgling',
        border: 'none',
        cursor: `pointer`,
        color: (this.state.hover) ? '#FB7461' : 'white',
        textAlign: 'left',
        fontSize: '4em',
        outline: 'none',
        backgroundColor: 'transparent',
        transition: 'none',
        fontWeight: 'bold',
        WebKitTransition: 'none',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
      }
    }

    return (
      <div
        style={ styles.result}
        onClick={ this.handleClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        block>
        { this.props.children }
      </div>
    )
  }
}
