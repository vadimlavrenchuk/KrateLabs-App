import React from 'react'

class Comment extends React.Component {
  render() {
    return <div>{this.props.json.name}</div>
  }
}

export default Comment
