export const CHECK_VIDEO_DATA     = 'CHECK_VIDEO_DATA'
export const ADD_VIDEO            = 'ADD_VIDEO'

import getYoutubeUrl from 'youtube-url'
import { getVideoData } from '../api/youtubeData'

// 웹뷰 로드 시작.
export function onLoadStart(event) {
  const url = event.target.getURL()
  const urlValidate = getYoutubeUrl.extractId(url)

  return dispatch => {
    getVideoData(urlValidate, (err, result) => {
      if (err) return console.log(err)
      dispatch(checkVideo(result))
    })
  }
}

// 비디오 검사.
export function checkVideo(result) {
  return {
    type: CHECK_VIDEO_DATA,
    result
  }
}

// 비디오 추가.
export function addVideo(event) {
  return {
    type: ADD_VIDEO,
    event
  }
}
