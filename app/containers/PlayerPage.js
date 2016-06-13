import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Player from '../components/Player/Player'
import * as PlayerActions from '../actions/player'

const playerOpts = window.require('../user-data/appConfig.json').playerOpts

function mapStateToProps(state) {
  return {
    playerOptions: playerOpts,
    playerState: state.playerState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PlayerActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
