import React from 'react'

export default class Logo extends React.Component {

  static defaultProps = {
    src: "../images/logo_home.png",
    width: 150,
    left: 13,
    bottom: 5
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let style = {
      position: 'absolute',
      bottom: this.props.bottom,
      left: this.props.left,
      zIndex: 25,
      transition: 'all 1s',
      filter: `drop-shadow(1.5px 1.5px 0px black) drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.50))`,
      WebkitFilter: `drop-shadow(1.5px 1.5px 0px black) drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.50))`,
      WebkitUserSelect: 'none'
    }

    return (
      <img
        style={ style }
        src={ this.props.src }
        width={ this.props.width }
      />
    )
  }
}
