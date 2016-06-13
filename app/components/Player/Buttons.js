import React, { Component } from 'react'
import { IconButton, FontIcon } from 'material-ui'
import ToggleDisplay from 'react-toggle-display'
import styles from './Buttons.module.css'

class Buttons extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const {
      repeatState,        // 반복재생 상태.
      disabled,           // 디저블.
      openPlayList,       // 플레이 리스트.
      perv,               // 이전.
      play,               // 플래이/일시정지.
      next,               // 다음.
      repeat,             // 반복.
      fullscreenToggle,   // 전체화면/기본화면.
      isFullscreen,       // 풀스크린 상태.
      playIcon            // 플레이 아이콘.
    } = this.props

    return (
      <div>
        <ul className={styles.Buttons}>
          <li>
            <IconButton
              className={repeatState ? styles.OnBtnRepeatVideo : styles.OffBtnRepeatVideo}
              onFocus={repeat}>
                <FontIcon className="ion-loop" />
            </IconButton>
          </li>
          <li>
            <IconButton
              className={styles.BtnPreviousVideo}
              onFocus={perv}
              disabled={disabled}>
              <FontIcon className="ion-ios-rewind" />
            </IconButton>
          </li>
          <li>
            <IconButton
              className={styles.BtnPauseVideo}
              onFocus={play}
              disabled={disabled}>
              <FontIcon className={playIcon} />
            </IconButton>
          </li>
          <li>
            <IconButton
              className={styles.BtnNextVideo}
              onFocus={next}
              disabled={disabled}>
              <FontIcon className="ion-ios-fastforward" />
            </IconButton>
          </li>
          <li className={isFullscreen ? styles.BtnHide : styles.BtnsRight}>
            <IconButton
              className={styles.BtnAppMenus}
              onFocus={openPlayList}>
              <FontIcon className="ion-search" />
            </IconButton>
          </li>
          <li className={styles.BtnsRight}>
            <IconButton
              className={styles.BtnAddVideo}
              onFocus={fullscreenToggle}
              disabled={disabled}>
              <span className={styles.Fullscreen}>
                <FontIcon className='ion-heart' />
              </span>
            </IconButton>
          </li>
        </ul>
      </div>
    )
  }
}

export default Buttons
