import {
  SET_PLAY_LIST,
  SET_PLAY_REPEAT,
  SET_PLAY_START,
  PLAYER_ON_STARTED,
  PLAYER_ON_MOUSE_ENTER,
  PLAYER_ON_MOUSE_LEAVE,
  PLAYER_ON_READY,
  PLAYER_ON_PLAY,
  PLAYER_ON_PAUSE,
  PLAYER_ON_END,
  PLAYER_ON_ERROR,
  PLAYER_ON_TIME,
  OPEN_PLAY_LIST,
  PLAY_TOGGLE,
  PLAY_NEXT,
  PLAY_PREV,
  SEEK_TO,
  FULLSCREEN_TOGGLE
} from '../actions/player'
import React, { Component } from 'react'
import getYoutubeId from 'get-youtube-id'
import getYoutubeThumbnail from 'youtube-thumbnail'
import iframe from 'fullscreen-iframe-content'
import { insertDoc, deleteDoc } from '../api/pouchdb'

const ls = window.require('local-storage')
const ipcRenderer = window.require('electron').ipcRenderer
const loadingMsg = '로딩중..'
const initialPlayerState = {
  isStarted: false,
  isFullscreen: false,
  player_disabled: true,
  player_hovered: false,
  videos: [],
  play_list_id: null,
  title: loadingMsg,
  play_icon: 'ion-ios-play',
  screenRatio: true,
  checker_disabled: true,
  checker_video_id: null,
  checker_video_doc: null,
  repeat: false,
  index: 0,
  play_time: 0
}

export function playerState(state = initialPlayerState, action) {
  switch (action.type) {

  // 플레이 리스트.
  case SET_PLAY_LIST:
    var videos = []
    action.docs.forEach((item) => {
      videos.push(item.doc.vid) // 비디오 아이디만 주출한다.
    })

    return {
      ...state,
      videos: videos
    }

  // 플레이어 레디.
  case PLAYER_ON_READY:
    ipcRenderer.send('ready-player')

    return {
      ...state,
      player: action.event.target
    }

  // 플레이어 재시작/시작.
  case SET_PLAY_START:
    state.player.loadPlaylist(state.videos, action.index)
    state.player.setLoop(true)

    return {
      ...state,
      index: action.index
    }

  // 한곡 반복재생 설정/해제.
  case SET_PLAY_REPEAT:
    action.event.target.blur()

    return {
      ...state,
      repeat: state.repeat ? false : true
    }

  // 플레이어 마우스 오버.
  case PLAYER_ON_MOUSE_ENTER:
    return {
      ...state,
      player_hovered: true
    }

  // 플레이어 마우스 아웃.
  case PLAYER_ON_MOUSE_LEAVE:
    return {
      ...state,
      player_hovered: false
    }

  // 플레이어 시작됨(플레이 리스트가 있는경우만 실행).
  case PLAYER_ON_STARTED:
    return {
      ...state,
      player_disabled: false,
      isStarted: true
    }

  // 재생 시작됨.
  case PLAYER_ON_PLAY:
    var data = action.event.target.getVideoData()
    var index = state.player.getPlaylistIndex()

    // TEST ->
    var getQualitys = state.player.getAvailableQualityLevels()
    var getQuality = state.player.getPlaybackQuality()
    console.log(getQualitys)
    console.log(getQuality)
    // TEST.

    return {
      ...state,
      play_icon: 'ion-ios-pause',
      index: index
    }

  // 플레이 상태바.
  case PLAYER_ON_TIME:
    const playerTotalTime = state.player.getDuration()
    const playerCurrentTime = state.player.getCurrentTime()
    const playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100

    return {
      ...state,
      video_loaded: state.player.getVideoLoadedFraction(),
      play_duration: state.player.getDuration(),
      play_state: playerTimeDifference,
      video_loaded: state.player.getVideoLoadedFraction()
    }

  // 일시정지 상태.
  case PLAYER_ON_PAUSE:
    return {
      ...state,
      play_icon: 'ion-ios-play'
    }

  // 재생 끝.
  case PLAYER_ON_END:

    if (state.repeat) { // 반복재생 상태 체크.
      state.player.loadPlaylist(state.videos, state.index)
      state.player.setLoop(true)
    }

    console.log('재생 끝.')

    return state

  // 에러 발생.
  case PLAYER_ON_ERROR:
    console.log('에러 발생.')
    console.error(action.event.target.getPlayerState())

    var skipVideo

    if (state.videos.length > 1 && state.player.getPlayerState() == 3) { // 재생이 시작되지 않는 경우.
      clearTimeout(skipVideo)
      skipVideo = setTimeout(
        ()=>{state.player.nextVideo()},
      3000)

      return state
    }

    return state

  // 플레이어 리스트 열기.
  case OPEN_PLAY_LIST:
    action.event.target.blur()
    ipcRenderer.send('open-playlist')

    return state

  // 다음 영상.
  case PLAY_NEXT:
    if (action.event) action.event.target.blur()
    state.player.nextVideo()

    return {
      ...state,
      title: loadingMsg
    }

  // 이전 영상.
  case PLAY_PREV:
    if (action.event) action.event.target.blur()
    state.player.previousVideo()

    return {
      ...state,
      title: loadingMsg
    }

  // 일시정지/재생.
  case PLAY_TOGGLE:
    if (action.event) action.event.target.blur()

    var playState = state.player.getPlayerState()
    playState == 1 ? state.player.pauseVideo() : state.player.playVideo()

    return state

  // 영상 이동.
  case SEEK_TO:
    action.event.target.blur()

    const getPlayTime = (state.player.getDuration() / 100) * action.value
    state.player.seekTo(getPlayTime)

    return {
      ...state,
      video_loaded: state.player.getVideoLoadedFraction(),
      play_duration: state.player.getDuration(),
      play_state: action.value,
      video_loaded: state.player.getVideoLoadedFraction()
    }

  // 풀스크린.
  case FULLSCREEN_TOGGLE:
    action.event.target.blur()

    var newState = state.isFullscreen ? false : true
    ipcRenderer.send('fullscreen-player', newState)

    return {
      ...state,
      isFullscreen: newState
    }

  default:
    return state
  }
}
