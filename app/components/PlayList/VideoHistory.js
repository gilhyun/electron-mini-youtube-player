import React, { Component } from 'react'
import ToggleDisplay from 'react-toggle-display'
import styles from './ListStyle.module.css'

const remote = window.require('electron').remote
const Menu = remote.Menu
const MenuItem = remote.MenuItem

var videoHistoryMenu
var selectVideoHistoryIndex
var selectVideoHistoryId

class VideoHistory extends Component {
  constructor(props) {
    super(props)
  }

  play(index) {
    this.props.playVideo(index)
  }

  removeDoc(doc_id) {
    this.props.removeVideo(doc_id)
  }

  contextMenu(index, doc_id) {
    event.preventDefault()
    selectVideoHistoryIndex = index
    selectVideoHistoryId = doc_id
    videoHistoryMenu.popup(remote.getCurrentWindow())
  }

  componentWillMount() {
    var self = this
    videoHistoryMenu = new Menu()
    videoHistoryMenu.append(new MenuItem({ label: '재생하기', click: ()=> { self.play(selectVideoHistoryIndex) } }))
    videoHistoryMenu.append(new MenuItem({ type: 'separator' }))
    videoHistoryMenu.append(new MenuItem({ label: '히스토리에서 제거', click: ()=> { self.removeDoc(selectVideoHistoryId) } }))
  }

  render() {

    return (
      <div className={styles.ListContainer}>
        <ToggleDisplay
          show={this.props.docList.length > 0 ? true : false}>
          <div className={styles.TitleBar}>
            내 히스토리
            <ToggleDisplay
              show={this.props.is_searched ? true : false}>
              &nbsp;검색결과
            </ToggleDisplay>
          </div>
          <div className={styles.List}>
            {this.props.docList.map((item, index) =>
              <ToggleDisplay
                show={!this.props.is_searched || item.doc.title.search(this.props.keyword) > 0}
                key={item.key}
                value={index}
                onClick={this.play.bind(this, index)}
                onContextMenu={this.contextMenu.bind(this, index, item.id)}>
                  <div className={styles.Thumb}>
                    <img src={item.doc.thumbnails.medium.url} />
                  </div>
                  <div className={styles.Title}>{item.doc.title}</div>
              </ToggleDisplay>
            )}
          </div>
        </ToggleDisplay>
      </div>
    )
  }
}

export default VideoHistory
