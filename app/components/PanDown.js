import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'


@observer
export default class SearchRemove extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.scroll = this.scroll.bind(this)
    this.state = {
      hover: false
    }
  }

  scroll(height, speed) {
    speed ++
    height += speed
    if (height < store.height) {
      window.scrollBy(0, speed)
      requestAnimationFrame(() => this.scroll(height, speed))
    } else {
      window.scrollTo(0, store.height)
    }
  }

  handleClick() {
    this.scroll(window.scrollY, 30)
  }

  render() {
    // Look into Styling
    // http://codepen.io/nxworld/pen/OyRrGy

    if (!store.isXs) return <div></div>

    let style = {
      position: 'absolute',
      right: store.width / 2 - 20,
      color: this.state.hover ? store.salmon : 'white',
      fontSize: '3.5em',
      zIndex: 30,
      bottom: 25,
      cursor: `pointer`,
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    }

    return (
      <div
        onClick={ this.handleClick }
        onMouseEnter={ () => this.setState({ hover: true }) }
        onMouseLeave={ () => this.setState({ hover: false }) }
        style={ style }>
        <Glyphicon glyph='chevron-down' />
      </div>
    )
  }
}
