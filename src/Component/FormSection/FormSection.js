import React from 'react';
import '../../css/flex.css';
import styles from './FormSection.module.css'


const FormSection = props => {

  return (
    <section className={styles.flexSection}>
      <h3>{props.headerName}</h3>
      <hr />
      <div className={styles.innerPadding}>{props.children}</div>
      </section>
  );
}



export default FormSection;