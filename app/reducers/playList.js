import {
  SAVE_VIDEO,
  ADD_CHECKER_VIDEO,
  CLEAR_SEARCH_LIST,
  REMOVE_VIDEO,
  GET_DOC_LIST,
  GET_VIDEO_CHECKER,
  IGNORE_VIDEO_CHECKER,
  GET_YT_DATAS,
  SEARCH_KEYWORD,
  PLAY_VIDEO,
  CHECKER_PLAYER_ON_READY,
  CHECKER_PLAYER_ON_ERROR,
  CHECKER_PLAYER_ON_PLAY
} from '../actions/playList'
import React, { Component } from 'react'
import { insertDoc, deleteDoc } from '../api/pouchdb'

const ls = window.require('local-storage')
const ipcRenderer = window.require('electron').ipcRenderer
const initialPlayListState = {
  docs: [],
  is_searched: null,
  is_new_search: null,
  focus_search_fild: null,
  search_keyword: null,
  search_results: [],
  search_info: [],
  search_infinite_scroll: true,
  checker_player: null,
  checker_video_error: false,
  checker_disabled: true,
  checker_video_id: null,
  checker_video_doc: null
}

export function playListState(state = initialPlayListState, action) {
  switch (action.type) {

  // 검색 키워드 저장.
  case SEARCH_KEYWORD:
    return {
      ...state,
      search_keyword: action.keyword
    }

  // 유튜브 비디오 검색결과 리스트.
  case GET_YT_DATAS:
    var newData
    var isNew

    if (state.search_keyword == action.keyword) {
      newData = state.search_results.concat(action.results)
      isNew = false
    } else {
      newData = action.results
      isNew = true
    }

    return {
      ...state,
      is_searched: true,
      is_new_search: isNew,
      search_results: newData,
      search_info: action.pageInfo,
      search_keyword: action.keyword
    }

  // 유튜브 비디오 검색결과 리스트를 지운다.
  case CLEAR_SEARCH_LIST:
    ipcRenderer.send('refresh-playlist', 1)
    return {
      ...state,
      is_searched: false,
      search_results: []
    }

  // 히스토리 목록.
  case GET_DOC_LIST:
    return {
      ...state,
      docs: action.docs
    }

  // 클립보드 비디오 체크.
  case GET_VIDEO_CHECKER:
    // 무시상태 체크.
    var ignire = ls('Ignore_video_id')

    if (ignire == action.checker_video_id) {
      console.log('클립보드가 무시 됨.')
      return state
    }

    return {
      ...state,
      checker_disabled: false,
      checker_video_id: action.checker_video_id,
      checker_video_doc: action.checker_video_doc
    }

  // 비디오 체크용 플레이어 - 레디.
  case CHECKER_PLAYER_ON_READY:
    return {
      ...state,
      checker_player: action.event.target
    }

  // 비디오 체크용 플레이어 - 에러.
  case CHECKER_PLAYER_ON_ERROR:
    console.log('비디오 체크용 플레이어 - 에러.')
    return {
      ...state,
      checker_video_error: true
    }

  // 비디오 체크용 플레이어 - 재생시작.
  case CHECKER_PLAYER_ON_PLAY:
    state.checker_player.mute()
    return {
      ...state,
      checker_video_error: false
    }

  // 비디오 저장.
  case SAVE_VIDEO:
    var id = new Date().toISOString()
    var doc = action.item
    var video_id = action.item.id
    var video = {
      _id: id,
      vid: doc.id,
      channelId: doc.channelId,
      description: doc.description,
      link: doc.link,
      kind: doc.kind,
      publishedAt: doc.publishedAt,
      thumbnails: doc.thumbnails,
      title: doc.title
    }

    insertDoc(video, (err, res) => {
      if (err) return console.log(err)
      ipcRenderer.send('play-video', 0)
    })

    return state

  // 비디오 저장(외부재생 체크기능 포함).
  case ADD_CHECKER_VIDEO:
    action.event.target.blur()
    state.checker_player.stopVideo()

    // 외부 플레이가능 영상인지 체크.
    if (state.checker_video_error) {
      return {
        ...state,
        checker_disabled: true
      }
    }

    var id = new Date().toISOString()
    var doc = state.checker_video_doc
    var video_id = state.checker_video_id
    var video = {
      _id: id,
      vid: doc.id,
      channelId: doc.channelId,
      description: doc.description,
      link: doc.link,
      kind: doc.kind,
      publishedAt: doc.publishedAt,
      thumbnails: doc.thumbnails,
      title: doc.title
    }

    insertDoc(video, (err, res) => {
      if (err) return console.log(err)
      console.log(res)

      ls('Ignore_video_id', video_id)
      ipcRenderer.send('play-video', 0)
    })

    return {
      ...state,
      checker_video_id: null,
      checker_video_doc: null,
      checker_disabled: true
    }

  // 비디오 삭제.
  case REMOVE_VIDEO:
    // TODO: 삭제 되돌리기.
    // if (confirm('비디오를 삭제 합니다.') == false) {
    //   return state
    // }

    deleteDoc(action.doc_id, (err, res) => {
      if (err) return ipcRenderer.send('refresh-playlist', err)
      ipcRenderer.send('refresh-playlist', res)
    })

    return state

  case PLAY_VIDEO:
    ipcRenderer.send('play-video', action.video_index)
    return state

  default:
    return state
  }
}
