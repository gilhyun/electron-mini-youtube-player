import {
  CHECK_VIDEO_DATA,
  ADD_VIDEO
} from '../actions/miniBrowser'
import React, { Component } from 'react'
import { insertDoc } from '../api/pouchdb'

const ls = window.require('local-storage')
const initialMiniBrowserState = {
  checker_video_doc: null,
  checker_video_id: null
}

export function miniBrowserState(state = initialMiniBrowserState, action) {
  switch (action.type) {

  // 비디오 체크
  case CHECK_VIDEO_DATA:
    return {
      ...state,
      checker_video_id: action.result.id,
      checker_video_doc: action.result
    }

  // 비디오 추가.
  case ADD_VIDEO:
    action.event.target.blur()
    const ignire = ls('Ignore_video_id')

    if (!state.checker_video_id) return state

    // 무시상태 체크.
    if (ignire == state.checker_video_id) {
      console.log('저장이 무시 됨.')
      return state
    }

    const ipcRenderer = window.require('electron').ipcRenderer
    const id = new Date().toISOString()
    const doc = state.checker_video_doc
    const video_id = state.checker_video_id
    const video = {
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
      ipcRenderer.send('리스트-새로고침', 0)
    })

    return {
      ...state,
      checker_video_id: null,
      checker_video_doc: null
    }

  default:
    return state
  }
}
