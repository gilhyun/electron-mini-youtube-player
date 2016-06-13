import React, { Component } from 'react'
import ToggleDisplay from 'react-toggle-display'
import { TextField, IconButton, FontIcon } from 'material-ui'
import styles from './SearchBar.module.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
  }

  handleChange() {
    if (this.refs.searchBox.getValue() == '') {
      this.props.clearSearchList()
      this.props.scrollTopList()
    }
  }

  handleSearch() {
    var keyword = this.refs.searchBox.getValue()

    if (keyword != this.props.playListState.search_keyword) {
      this.props.scrollTopList()
    }

    this.props.setKeyword(keyword)
  }

  focusInput() {
    this.refs.searchBox.refs.input.focus()
  }

  clearKeyword() {
    this.refs.searchBox.clearValue()
    this.props.clearSearchList()
  }

  componentDidMount() {
    this.refs.searchBox.refs.input.focus()
  }

  render() {

    return (
      <div className={styles.SearchBar}>
        <IconButton
          className={styles.BtnSearchIcon}
          onFocus={this.focusInput.bind(this)}>
          <FontIcon className="bi_interface-search" />
        </IconButton>
        <TextField
          className={styles.TextFieldSearch}
          onChange={this.handleChange.bind(this)}
          onEnterKeyDown={this.handleSearch.bind(this)}
          fullWidth={true}
          hintText="유튜브 비디오 또는 히스토리 검색"
          ref="searchBox" />
        <IconButton
          className={styles.BtnClearKeyword}
          onFocus={this.clearKeyword.bind(this)}>
          <FontIcon className="bi_interface-circle-cross" />
        </IconButton>
      </div>
    )
  }
}

export default SearchBar
