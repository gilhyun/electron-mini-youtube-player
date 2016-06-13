import React, { Component } from 'react'
import ToggleDisplay from 'react-toggle-display'
import SearchBar from './SearchBar'
import VideoChecker from './VideoChecker'
import VideoHistory from './VideoHistory'
import YTSearch from './YTSearch'
import styles from './PlayList.module.css'

// import Waypoint from 'react-waypoint'

class PlayList extends Component {
  constructor(props) {
    super(props)
  }

  scrollTopList() {
    this.refs.listContentsDiv.scrollTop = 0
  }

  // wpEnterHandler() {
  //   console.log('wpEnterHandler')
  // }
  //
  // wpLeaveHandler() {
  //   console.log('wpLeaveHandler')
  // }

  render() {

    const {
      playListState,          // 트레이 윈도우 상태.
      saveVideo,              // 비디오 저장.
      clearSearchList,        // 검색 리스트 지우기.
      addChekerVideo,         // 비디오 저장(비디오 체커).
      checkerPlayerOnReady,   // 비디오 체커 레디.
      checkerPlayerOnError,   // 비디오 체커 에러.
      checkerPlayerOnPlay,    // 비디오 체커 플레이 시작.
      playVideo,              // 비디오 실행.
      removeVideo,            // 비디오 삭제.
      searchAsync,            // 비디오 검색.
      getNextPage             // 검색 다음페이지.
    } = this.props

    return (
      <div
        id='listContainer'
        className={styles.PlayListContainer}>
        <SearchBar
          playListState={playListState}
          scrollTopList={this.scrollTopList.bind(this)}
          setKeyword={searchAsync}
          clearSearchList={clearSearchList} />
        <div
          className={styles.PlayListContents}
          ref='listContentsDiv'>
          <VideoChecker
            disabled={playListState.checker_disabled}
            playListState={playListState}
            addChekerVideo={addChekerVideo}
            checkerPlayerOnReady={checkerPlayerOnReady}
            checkerPlayerOnError={checkerPlayerOnError}
            checkerPlayerOnPlay={checkerPlayerOnPlay}
            isError={playListState.checker_video_error} />
          <VideoHistory
            is_searched={playListState.is_searched}
            keyword={playListState.search_keyword}
            docList={playListState.docs}
            playVideo={playVideo}
            removeVideo={removeVideo} />
          <YTSearch
            searchList={playListState.search_results}
            searchInfo={playListState.search_info}
            playListState={playListState}
            saveVideo={saveVideo}
            getNextPage={getNextPage} />
        </div>
      </div>
    )
  }
}

export default PlayList
