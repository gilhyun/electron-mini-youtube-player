import React, { Component, PropTypes} from 'react';

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
