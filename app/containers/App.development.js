import React, { Component, PropTypes} from 'react'
import DevTools from './DevTools'

// <DevTools />
export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
