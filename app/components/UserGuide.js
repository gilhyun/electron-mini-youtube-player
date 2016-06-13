import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './UserGuide.module.css';


export default class UserGuide extends Component {
  render() {
    return (
      <div>
        <div className={styles.UserGuideContainer}>
          <h2 className='animated fadeIn'>Welcome!</h2>
          <p>환영 합니다!</p>
        </div>
      </div>
    );
  }
}
