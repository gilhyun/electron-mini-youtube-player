import React from 'react'
import routes from './routes'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { allDocs } from './api/pouchdb'
import { findVideos } from './api/youtubeData'
import configureStore from './store/configureStore'

import './assets/fonts/ko-NanumBarunGothic/NanumBarunGothic.css'
import './assets/fonts/ionicons/ionicons.css'
import './assets/styles/animate.css'
import './assets/styles/font-ko.css'
import './assets/styles/base.css'

const ipc = window.require('electron').ipcRenderer
const store = configureStore()

render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)

// ---
// ipc 통신.

// To Player.
// -->
ipc.on('show-controller-to-player', (event, state) => {
  if (state) {
    store.dispatch({
      type: 'PLAYER_ON_MOUSE_LEAVE'
    })
  } else {
    store.dispatch({
      type: 'PLAYER_ON_MOUSE_ENTER'
    })
  }
})

ipc.on('play-video-to-player', (event, index) => {
  allDocs((err, db) => {
    if (err) return console.log(err)
    if (db.rows.length > 0) {

      store.dispatch({
        type: 'SET_PLAY_LIST',
        player_disabled: false,
        docs: db.rows
      })

      store.dispatch({
        type: 'SET_PLAY_START',
        index: index
      })

      store.dispatch({
        type: 'PLAYER_ON_STARTED'
      })
    }
  })
})

// Playlist.
// -->
ipc.on('dispatch-playlist-to-playlist', (event, status) => {
  allDocs((err, db) => {
    if (err) return console.log(err)
    store.dispatch({
      type: 'GET_DOC_LIST',
      docs: db.rows
    })
  })
})

ipc.on('검색박스-포커스', (event, status) => {
  console.log('검색박스-포커스')
})

ipc.on('클립보드-발견', (event, video_id) => {
  findVideos(video_id, (err, results) => {
    if (err) return console.log(err)
    store.dispatch({
      type: 'GET_VIDEO_CHECKER',
      checker_video_id: video_id,
      checker_video_doc: results[0]
    })
  })
})

// Online status.
// -->
ipc.on('online', (event, status) => {
  window.location.hash = ''
})

ipc.on('offline', (event, status) => {
  window.location.hash = '/offline'
})

// Hash.
// -->
ipc.on('change-hash', (event, url) => {
  window.location.hash = url
})
