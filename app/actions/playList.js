export const GET_VIDEO_CHECKER =         'GET_VIDEO_CHECKER'
export const GET_DOC_LIST =              'GET_DOC_LIST'

export const SAVE_VIDEO =                'ADD_SEARCH_VIDEO'
export const ADD_CHECKER_VIDEO =         'ADD_CHECKER_VIDEO'

export const SEARCH_KEYWORD =            'SEARCH_KEYWORD'
export const GET_YT_DATAS =              'GET_YT_DATAS'
export const CLEAR_SEARCH_LIST =         'CLEAR_SEARCH_LIST'

export const IGNORE_VIDEO_CHECKER =      'IGNORE_VIDEO_CHECKER'
export const REMOVE_VIDEO =              'REMOVE_VIDEO'

export const PLAY_VIDEO =                'PLAY_VIDEO'
export const CHECKER_PLAYER_ON_READY =   'CHECKER_PLAYER_ON_READY'
export const CHECKER_PLAYER_ON_ERROR =   'CHECKER_PLAYER_ON_ERROR'
export const CHECKER_PLAYER_ON_PLAY =    'CHECKER_PLAYER_ON_PLAY'

import { findVideos } from '../api/youtubeData'
import { searchDocs } from '../api/pouchdb'

// 검색 키워드.
export function searchAsync(keyword) {
  if (!keyword) {
    return dispatch => {
      dispatch(clearSearchList())
      dispatch(saveKeyword(null))
    }
  }

  return dispatch => {
    findVideos(keyword, (err, results, pageInfo) => {
      if (err) return console.log(err)
      dispatch(getYTDatas(keyword, results, pageInfo))
    })
  }
}

// 유튜브 비디오 검색결과 리스트.
export function getYTDatas(keyword, results, pageInfo) {
  return {
    type: GET_YT_DATAS,
    keyword,
    results,
    pageInfo
  }
}

// 유튜브 비디오 검색결과 다음페이지.
export function getNextPage(keyword, nextPageToken) {
  return dispatch => {
    findVideos(keyword, (err, results, pageInfo) => {
      if (err) return console.log(err)
      dispatch(getYTDatas(keyword, results, pageInfo))
    }, nextPageToken)
  }
}

// 유튜브 비디오 검색결과를 비운다.
export function clearSearchList() {
  return {
    type: CLEAR_SEARCH_LIST
  }
}

// 검색 키워드.
export function saveKeyword(keyword) {
  return {
    type: SEARCH_KEYWORD,
    keyword
  }
}

// 히스토리 목록.
export function getDocList(docs) {
  return {
    type: GET_DOC_LIST,
    docs
  }
}

// 클립보드 비디오 체크.
export function getVideoChecker(state) {
  return {
    type: GET_VIDEO_CHECKER,
    state
  }
}

// 클립보드 무시.
export function ignireVideoChecker(event) {
  return {
    type: IGNORE_VIDEO_CHECKER,
    event
  }
}

// 비디오 저장(비디오 외부재생여부 체크 포함).
export function addChekerVideo(event) {
  return {
    type: ADD_CHECKER_VIDEO,
    event
  }
}

// 비디오 저장.
export function saveVideo(item) {
  console.log(item)
  return {
    type: SAVE_VIDEO,
    item
  }
}

// 비디오 삭제.
export function removeVideo(doc_id) {
  return {
    type: REMOVE_VIDEO,
    doc_id: doc_id
  }
}

// 비디오 플레이.
export function playVideo(index) {
  return {
    type: PLAY_VIDEO,
    video_index: index
  }
}

// 체커용 플레이어 레디.
export function checkerPlayerOnReady(event) {
  return {
    type: CHECKER_PLAYER_ON_READY,
    event
  }
}

// 체커용 플레이어 에러.
export function checkerPlayerOnError(event) {
  return {
    type: CHECKER_PLAYER_ON_ERROR,
    event
  }
}

// 체커용 플레이어 재생.
export function checkerPlayerOnPlay(event) {
  return {
    type: CHECKER_PLAYER_ON_PLAY,
    event
  }
}
