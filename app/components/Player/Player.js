import React, { Component, PropTypes } from 'react'
import ToggleOpacity from '../../utils/ToggleOpacity'
import mouseidle from '../../utils/mouseidle'
import YouTube from 'react-youtube'
import PlayerControl from './PlayerControl'
import TitleBar from './TitleBar'
import styles from './Player.module.css'

class Player extends Component {
  constructor(props) {
    super(props)
    this.handleResize = this.handleResize.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.state = {
      windowHeight2x: window.innerHeight * 4,
      playerCenterTop: (window.innerHeight * 4) / 2.665
    }
  }

  handleResize(event) {
    let h = event.target.innerHeight
    this.setState({
      windowHeight2x: h * 4,
      playerCenterTop: (h * 4) / 2.665
    })
  }

  handleKeydown(event) {
    this.props.playerOnKeydown(event)
  }

  componentDidMount() {
    const $ = window.require('dombo')
    const t = window.require('titlebar')
    const Titlebar = t()
    const ipcRenderer = window.require('electron').ipcRenderer

    window.addEventListener('resize', this.handleResize)
    window.addEventListener('keydown', this.handleKeydown)

    // Titlebar
    Titlebar.appendTo('#app-titlebar')

    Titlebar.on('close', (event) => {
      ipcRenderer.send('close-player')
    })

    Titlebar.on('minimize', (event) => {
      ipcRenderer.send('minimize-player')
    })

    Titlebar.on('fullscreen', (event) => {
      ipcRenderer.send('fullscreen-player')
    })

    // 3초후 플레이어 컨트롤들이 사라지도록 한다.
    mouseidle($('#mini-player')[0], 3000, 'hide-cursor')
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeydown)
  }

  render() {
    const {
      playerOptions,        // 플레이어 옵션.
      playerState,          // 플레이어 상태.
      playerOnMouseEnter,   // 플레이어에 마우스 오버.
      playerOnMouseLeave,   // 플레이어에서 마우스 아웃.
      playerOnReady,        // 플레이어 준비됨.
      playerOnPlay,         // 재생 시작.
      playerOnPause,        // 일시정지.
      playerOnEnd,          // 재생 끝.
      playerOnError,        // 에러났을때.
      playerOnStateChange,  // 플레이어 상태 변경시.
      openPlayList,         // 플레이 리스트 열기.
      playToggle,           // 재생/일시정지
      playNext,             // 다음 비디오.
      playPerv,             // 이전 비디오.
      fullscreenToggle,     // 최대화/최소화.
      setPlayRepeat,        // 반복설정.
      seekTo                // 구간 이동.
    } = this.props

    return (
      <div
        id='mini-player'
        onMouseEnter={playerOnMouseEnter}
        onMouseLeave={playerOnMouseLeave}>
        <ToggleOpacity show={playerState.player_hovered} id='app-titlebar' />
        <div className={styles.PlayerContainer}>
          <div
            className='iframe-container'
            style={{
              marginTop: '-' + this.state.playerCenterTop + 'px',
              height: this.state.windowHeight2x + 'px'
            }}>
            <YouTube
              videoId='M3IdyeahcS8'
              opts={playerOptions}
              onReady={playerOnReady}
              onError={playerOnError}
              onPlay={playerOnPlay}
              onPause={playerOnPause}
              onEnd={playerOnEnd}
              onStateChange={playerOnStateChange} />
          </div>
        </div>
        <ToggleOpacity
          show={playerState.player_hovered}
          className='playerControlBox'>
          <PlayerControl
            playerState={playerState}
            seekTo={seekTo}
            setPlayRepeat={setPlayRepeat}
            openPlayList={openPlayList}
            perv={playPerv}
            play={playToggle}
            next={playNext}
            fullscreenToggle={fullscreenToggle} />
          <TitleBar
            titleText={playerState.title}
            disabled={playerState.player_disabled} />
        </ToggleOpacity>
      </div>
    )
  }
}

export default Player
