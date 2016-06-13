import React, { Component } from 'react'
import ToggleDisplay from 'react-toggle-display'
import Waypoint from 'react-waypoint'
import styles from './ListStyle.module.css'

class YTSearch extends Component {
  constructor(props) {
    super(props)
  }

  save(item) {
    this.props.saveVideo(item)
  }

  nextPage() {
    const { playListState, searchInfo, getNextPage } = this.props
    getNextPage(playListState.search_keyword, searchInfo.nextPageToken)
  }

  infiniteLoad() {
    const { playListState, searchInfo } = this.props
    if (playListState.is_searched && searchInfo.nextPageToken) {
      this.nextPage()
    }
  }

  render() {

    return (
      <div className={styles.ListContainer}>
        <ToggleDisplay show={this.props.searchList.length>0}>
          <div className={styles.TitleBar}>Youtube 검색결과</div>
          <div className={styles.List}>
            {this.props.searchList.map((item, index) =>
              <span key={index}>
                <div
                  className={styles.ListCover}
                  onClick={this.save.bind(this, item)}>
                  <div className={styles.Thumb}>
                    <img src={item.thumbnails.medium.url} />
                  </div>
                  <div className={styles.Title}>
                    {item.title}
                  </div>
                </div>
              </span>
            )}
            <ToggleDisplay
              show={this.props.playListState.search_infinite_scroll ? false : true}
              className={styles.Next}
              onClick={this.nextPage.bind(this)}>
              더 불러오기
            </ToggleDisplay>
          </div>
        </ToggleDisplay>
        <Waypoint
          onEnter={this.infiniteLoad.bind(this)}
          threshold={0.2} />
      </div>
    )
  }
}

export default YTSearch
