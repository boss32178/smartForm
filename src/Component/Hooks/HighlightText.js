import React from 'react';
import styles from '../../css/generalStyles.module.css';

export const getHighlightedText = (text, higlight) => {
    // Split on higlight term and include term into parts, ignore case
    let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    let highlightedText = parts.map((part, i) => {
        let thisCLass = part.toLowerCase() === higlight.toLowerCase() ? `${styles.highlighted}` : "" ;
            return <span key={i} className={thisCLass}>{part}</span>
        });
    return (<div>{highlightedText}</div>);
}