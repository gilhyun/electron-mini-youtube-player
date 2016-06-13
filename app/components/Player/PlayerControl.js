import React, { Component } from 'react'
import ToggleDisplay from 'react-toggle-display'
import { Slider } from 'material-ui'
import Tips from './Tips'
import Buttons from './Buttons'
import styles from './PlayerControl.module.css'

const remote = window.require('electron').remote
const Menu = remote.Menu
const MenuItem = remote.MenuItem

// TODO: '커스텀테마/Slider'로 이름 바꾸기.
const themeDark = require('../../assets/themes/dark')
const ThemeManager = require('material-ui/lib/styles/theme-manager')
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator')

var playerMenu

@ThemeDecorator(ThemeManager.getMuiTheme(themeDark))
class PlayerControl extends Component {
  constructor(props) {
    super(props)
  }

  contextMenu(index, doc_id) {
    event.preventDefault()
    playerMenu.popup(remote.getCurrentWindow())
  }

  componentWillMount() {
    const ipcRenderer = window.require('electron').ipcRenderer

    playerMenu = new Menu()
    playerMenu.append(new MenuItem({ label: '다른 모든 윈도우 위에 유지', click: ()=> { ipcRenderer.send('always-on-top-player') } }))
    playerMenu.append(new MenuItem({ type: 'separator' }))
    playerMenu.append(new MenuItem({ label: '전체화면으로 보기', click: ()=> {  } }))
  }

  render() {
    const {
      openPlayList,     // 플레이 리스트.
      playerState,      // 플레이어 상태.
      repeatState,      // 반복재생 상태.
      setPlayRepeat,    // 반복재생.
      playIcon,         // 플레이 아이콘.
      seekTo,           // 구간 이동.
      perv,             // 이전.
      play,             // 플래이/일시정지.
      next,             // 다음.
      repeat,           // 반복.
      fullscreenToggle, // 전체화면/기본화면.
      isFullscreen      // 풀스크린 상태.
    } = this.props

    return (
      <div onContextMenu={this.contextMenu.bind(this)}>
        <Tips
          disabled={playerState.player_disabled}
          isStarted={playerState.isStarted} />
        <ToggleDisplay className={styles.PlayerControl} hide={playerState.player_disabled}>
          <div className={styles.ControlContainer}>
            <Buttons
              disabled={playerState.player_disabled}
              repeatState={playerState.repeat}
              repeat={setPlayRepeat}
              openPlayList={openPlayList}
              perv={perv}
              play={play}
              next={next}
              fullscreenToggle={fullscreenToggle}
              isFullscreen={playerState.isFullscreen}
              playIcon={playerState.play_icon} />
            <div className={styles.SliderCover}>
              <div className={styles.SliderBg}>
                <Slider
                  name='SliderBar'
                  className={styles.SliderBar}
                  defaultValue={0}
                  value={playerState.play_state}
                  min={0}
                  max={100}
                  onChange={seekTo} />
              </div>
            </div>
          </div>
        </ToggleDisplay>
      </div>
    )
  }
}

export default PlayerControl
