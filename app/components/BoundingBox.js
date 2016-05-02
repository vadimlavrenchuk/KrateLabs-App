import React from 'react'


export default class BoundingBox extends React.Component {

  static defaultProps = { }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        width: this.props.orientation == 1 ? '80%' : '50%',
        left:  this.props.orientation == 1 ? '10%' : '25%',
        height: this.props.orientation == 1 ? '50%' : '80%',
        top: this.props.orientation == 1 ? '25%' : '10%',
        zIndex: 5,
        border: '5px',
        borderStyle: 'solid',
        borderColor: '#FB7461',
        pointerEvents: 'none'
      }
    }

    return (
      <div style={ styles.container }></div>
    )
  }
}
