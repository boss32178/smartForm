import React from 'react';
import styles from './FormFooter.module.css';

const FormFooter = props => {

    return (
        <>
            <hr />
            <button className={`${styles.button} btn btn-default`} type="cancel" size="145">Back</button>
            <button className={`${styles.button} btn btn-danger`} type="button" size="145">Reset</button>
            <button className={`${styles.button} btn btn-primary`} type="submit" value="Submit" size="145" onClick={props.handleSubmit}>Save</button>
            <button className={`${styles.button} btn btn-info`} type="button" size="145">Send Cancellation</button>
            <button className={`${styles.button} btn btn-info`} type="button" size="145">Re-Send Cancellation</button>
        </>
    );
}

export default FormFooter;



