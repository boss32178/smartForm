import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {NumberValidation} from '../NumberValidation';
import styles from './PercentageInput.module.css';


const PercentageInput = props => {
    var { isDisabled, isLocked, value, max, ...input } = props;
    const [thisValue, setValue] = useState(value);

    const handlePercentValidation = event => {
        let cleanValue = NumberValidation(event.target.value, 3, 4);
 
        if (cleanValue > max) {
            let splitValue = event.target.value.split(".");
            setValue(thisValue === "" ? splitValue[0].substring(0,2) : thisValue);
        }  else {
            setValue(cleanValue);
        }
        
    };

    const handleBlur = event => {
        setValue(+event.target.value)
        props.onFocus();
    }

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <>
            <input className="flex flex-filler" type="text" value={thisValue}  {...input}  onChange={handlePercentValidation}
                disabled={isLocked || isDisabled} onBlur={handleBlur}/> <span className={styles.boldSign}>&#37;</span>
        </>
    );
};

PercentageInput.propTypes = {
    name: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    max: PropTypes.number,
    isDisabled: PropTypes.bool,
    isLocked: PropTypes.bool
}

PercentageInput.defaultProps = {
    max: 100,
    isLocked: false,
}


export default React.memo(PercentageInput);