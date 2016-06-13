import React, { Component } from 'react';
import { Link } from 'react-router';
import { RefreshIndicator } from 'material-ui'
import styles from './OffLine.module.css';


export default class OffLine extends Component {
  render() {
    return (
      <div>
        <div className={styles.OffLineContainer}>
          <img
            className={styles.img}
            src='./assets/fonts/futuro/futuro_icons_555.svg' />
          <h2 className='animated fadeIn'>인터넷 연결 안됨</h2>
          <RefreshIndicator
            size={20}
            left={15}
            top={15}
            style={{boxShadow: 'none'}}
            status="loading" />
          <div className={styles.Loading}>연결 중..</div>
        </div>
      </div>
    );
  }
}
