import React, { Component } from 'react'
import ToggleDisplay from 'react-toggle-display'
import YouTube from 'react-youtube'
import { IconButton, FontIcon } from 'material-ui'
import styles from './ListStyle.module.css'

// TODO: 체커를 빼거나. 하나로 통일.

const playerOpts = window.require('../user-data/appConfig.json').testPlayerOpts

class VideoChecker extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.playListState.checker_video_doc) return (<div></div>)

    const {
      isError,              // 체커 에러.
      disabled,             // 체커 디져블.
      playListState,        // 플레이 리스트 상태.
      addChekerVideo,       // 비디오 저장.
      checkerPlayerOnReady, // 체커용 플레이어 준비됨.
      checkerPlayerOnError, // 체커용 플레이어 에러.
      checkerPlayerOnPlay   // 체커용 플레이어 재생됨.
    } = this.props

    const {
      id,         // 비디오 아이디.
      title,      // 비디오 제목.
      thumbnails  // 비디오 썸네일.
    } = playListState.checker_video_doc

    return (
      <div className={styles.ListContainer}>
        <ToggleDisplay hide={disabled} className={styles.VideoCheckerContainer}>
          <div className={styles.TitleBar}>클립보드</div>
          <div
            className={styles.List}
            key='0'
            value='0'
            onClick={isError ? '' : addChekerVideo}>
            <span>
              <div className={styles.Thumb}>
                <img src={thumbnails.medium.url} />
              </div>
              <div className={styles.Title}>
                <ToggleDisplay hide={isError}>
                  {title}
                </ToggleDisplay>
                <ToggleDisplay show={isError}>
                  외부재생이 제한된 영상입니다.
                </ToggleDisplay>
              </div>
            </span>
          </div>
        </ToggleDisplay>
        <YouTube
          className={styles.hidePlayer}
          videoId={id}
          onReady={checkerPlayerOnReady}
          onError={checkerPlayerOnError}
          onPlay={checkerPlayerOnPlay}
          opts={playerOpts} />
      </div>
    )
  }
}

export default VideoChecker
