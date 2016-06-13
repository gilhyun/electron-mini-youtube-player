import React, { Component } from 'react'
import WebView from '../WebView'
import { IconButton, FontIcon } from 'material-ui'
import styles from './MiniBrowser.module.css'

export default class MiniBrowser extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      onLoadStart,
      addVideo,
      youtubeHomeState
    } = this.props

    // {youtubeHomeState.checker_video_id}

    return (
      <div className={styles.YoutubeHomeContainer}>
        <div className={styles.Toolbar}>
          <div className={styles.VideoChecker}>
            <IconButton
              className={styles.BtnPlayVideo}
              onFocus={addVideo}>
              <FontIcon className="bi_interface-tick" />
            </IconButton>
          </div>
        </div>
        <WebView
          className={styles.Webview}
          src='https://www.youtube.com/watch?v=PnblKcw3VPs'
          autosize={true}
          didStartLoading={onLoadStart} />
      </div>
    )
  }
}
