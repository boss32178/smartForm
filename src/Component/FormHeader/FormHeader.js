import React from 'react';
import styles from './FormHeader.module.css';


const FormHeader = props => {

  return (
    <header className={`flex wrap ${styles.flexHeader}`}>
      <div className={`column ${styles.leftCol}`}>
        <ul className={styles.pager}>
          <li>
            <a href="/" className={styles.backButton} type="cancel" size="145">← Back</a>
          </li>
        </ul>
      </div>
      <div className={`column ${styles.rightCol}`}>
        <ul className={styles.letter}>
          <li>
            <button type="button" className={`${styles.letterButton} btn btn-default`} size="145"><span className="glyphicon glyphicon-file"></span>Dealer Letter</button>
          </li>
          <li>
            <button type="button" className={`${styles.letterButton} btn btn-default`} size="145"><span className="glyphicon glyphicon-file"></span>Provider Letter</button>
          </li>
          <li>
            <button type="button" className={`${styles.letterButton} btn btn-default`} size="145"><span className="glyphicon glyphicon-file"></span>Provider Form</button>
          </li>
        </ul>
      </div>
      <div className={styles.clear}></div>
    </header>
  );
}

export default FormHeader;

