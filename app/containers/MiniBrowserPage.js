import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MiniBrowser from '../components/MiniBrowser/MiniBrowser'
import * as miniBrowserActions from '../actions/miniBrowser'

function mapStateToProps(state) {
  return {
    youtubeHomeState: state.youtubeHomeState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(miniBrowserActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniBrowser)
