import { combineReducers } from 'redux'
import { playerState } from './player'
import { playListState } from './playList'
// import { miniBrowserState } from './miniBrowser'

const rootReducer = combineReducers({
  playerState,
  playListState
  // miniBrowserState
})

export default rootReducer
