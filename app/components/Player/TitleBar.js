import React, { Component } from 'react'
import ToggleDisplay from 'react-toggle-display'
import styles from './TitleBar.module.css'

class TitleBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ToggleDisplay show={false} className={styles.TitleBar}>
        <ToggleDisplay hide={this.props.disabled}>
          {this.props.titleText}
        </ToggleDisplay>
        <ToggleDisplay className={styles.NoList} show={this.props.disabled} />
      </ToggleDisplay>
    )
  }
}

export default TitleBar
