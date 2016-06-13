import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlayList from '../components/PlayList/PlayList';
import * as playListActions from '../actions/playList';

function mapStateToProps(state) {
  return {
    playListState: state.playListState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(playListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
