import React, { Component } from 'react'
import ToggleDisplay from 'react-toggle-display'
import styles from './Tips.module.css'

class Tips extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ToggleDisplay className={styles.PlayerHide} show={this.props.disabled}>
          <div className={styles.NoVideo}>
            MINI Youtube Player v.1.0
          </div>
        </ToggleDisplay>
      </div>
    )
  }
}

export default Tips
