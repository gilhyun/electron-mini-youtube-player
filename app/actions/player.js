export const SET_PLAY_START   = 'SET_PLAY_START'
export const SET_PLAY_LIST    = 'SET_PLAY_LIST'
export const SET_PLAY_REPEAT  = 'SET_PLAY_REPEAT'

export const PLAYER_ON_STARTED      = 'PLAYER_ON_STARTED'
export const PLAYER_ON_MOUSE_ENTER  = 'PLAYER_ON_MOUSE_ENTER'
export const PLAYER_ON_MOUSE_LEAVE  = 'PLAYER_ON_MOUSE_LEAVE'
export const PLAYER_ON_READY        = 'PLAYER_ON_READY'
export const PLAYER_ON_PLAY         = 'PLAYER_ON_PLAY'
export const PLAYER_ON_PAUSE        = 'PLAYER_ON_PAUSE'
export const PLAYER_ON_END          = 'PLAYER_ON_END'
export const PLAYER_ON_ERROR        = 'PLAYER_ON_ERROR'
export const PLAYER_ON_STATE_CHANGE = 'PLAYER_ON_STATE_CHANGE'
export const PLAYER_ON_TIME         = 'PLAYER_ON_TIME'

export const OPEN_PLAY_LIST     = 'OPEN_PLAY_LIST'
export const FULLSCREEN_TOGGLE  = 'FULLSCREEN_TOGGLE'
export const PLAY_TOGGLE        = 'PLAY_TOGGLE'
export const PLAY_NEXT          = 'PLAY_NEXT'
export const PLAY_PREV          = 'PLAY_PREV'
export const SEEK_TO            = 'SEEK_TO'

let setPlayerTimer = null

// 비디오 리스트.
export function setPlayList(docs) {
  return {
    type: SET_PLAY_LIST,
    docs
  }
}

// 비디오 리스트의 재생번호를 지정한다.
export function setPlayStart(index) {
  return {
    type: SET_PLAY_START,
    index: index
  }
}

// 반복재생 설정/해제.
export function setPlayRepeat(event) {
  return {
    type: SET_PLAY_REPEAT,
    event
  }
}

// 플레이어 레디.
export function playerOnReady(event) {
  return {
    type: PLAYER_ON_READY,
    event
  }
}

// 플레이어 마우스 오버.
export function playerOnMouseEnter() {
  return {
    type: PLAYER_ON_MOUSE_ENTER
  }
}

// 플레이어 마우스 아웃.
export function playerOnMouseLeave() {
  return {
    type: PLAYER_ON_MOUSE_LEAVE
  }
}

// 플레이어 시작.
export function playerOnStarted() {
  return {
    type: PLAYER_ON_STARTED
  }
}

// 플레이어 상태 감지.
export function playerOnStateChange(event) {
  if (event.data == 1) {
    return playerOnTimeAsync()
  } else {
    clearInterval(setPlayerTimer)
  }

  return event.data
}

// 플레이 시간.
export function playerOnTime() {
  return {
    type: PLAYER_ON_TIME
  }
}

// 플레이 시간 실시간 업데이트.
export function playerOnTimeAsync(time = 1000) {
  return dispatch => {
    setPlayerTimer=setInterval(()=>{
      dispatch(playerOnTime())
    },time)
  }
}

// 재생 시작.
export function playerOnPlay(event) {
  return {
    type: PLAYER_ON_PLAY,
    event
  }
}

// 재생 끝.
export function playerOnEnd(event) {
  return {
    type: PLAYER_ON_END,
    event
  }
}

// 일시정지 상태.
export function playerOnPause(event) {
  return {
    type: PLAYER_ON_PAUSE,
    event
  }
}

// 에러 발생시.
export function playerOnError(event) {
  return {
    type: PLAYER_ON_ERROR,
    event
  }
}

// 플레이 리스트 열기.
export function openPlayList(event) {
  return {
    type: OPEN_PLAY_LIST,
    event
  }
}

// 다음 비디오.
export function playNext(event) {
  return {
    type: PLAY_NEXT,
    event
  }
}

// 이전 비디오.
export function playPerv(event) {
  return {
    type: PLAY_PREV,
    event
  }
}

// 재생/일시정지.
export function playToggle(event) {
  return {
    type: PLAY_TOGGLE,
    event
  }
}

// 영상 이동.
export function seekTo(event, value) {
  return {
    type: SEEK_TO,
    event,
    value
  }
}

// 전체화면/기본화면
export function fullscreenToggle(event) {
  return {
    type: FULLSCREEN_TOGGLE,
    event
  }
}

// 키보드 컨트롤
export function playerOnKeydown(event) {
  const ipcRenderer = window.require('electron').ipcRenderer

  return dispatch => {
    switch (event.keyCode) {
      case 27: // esc.
        return dispatch(playToggle())

      case 32: // 스페이스바.
        return dispatch(playToggle())

      case 39: // 다음.
        return dispatch(playNext())

      case 37: // 이전.
        return dispatch(playPerv())

      case 13: // 전체화면.
        ipcRenderer.send('fullscreen-player')
        return false

      default:
        return false
    }
  }
}
