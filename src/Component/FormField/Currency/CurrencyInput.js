import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {NumberValidation} from '../NumberValidation';
import styles from './CurrencyInput.module.css';

const CurrencyInput = props => {
    var { isDisabled, isLocked, value, max, ...input } = props;
    const [thisValue, setValue] = useState(value);

    const handleCurrencyValidation = event => {
        let cleanValue = NumberValidation(event.target.value, max, 2);
        setValue(cleanValue);
    };

    const handleCurrencyFormatting = event => {
        if(event.target.value !== ""){
            let prettyValue = event.target.value.replace(/[^\d.]/g, '');
            let currency = parseFloat(prettyValue).toFixed(2);;
            let cleanValue = currency.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            setValue(cleanValue);
        }
        props.onFocus();
    }

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <>
            <span className={styles.boldSign}>&#36;</span>
            <input className="flex flex-filler" type="text" value={thisValue} {...input} onChange={handleCurrencyValidation}  
                    disabled={isLocked || isDisabled} onBlur={handleCurrencyFormatting} />
        </>
    );
};

CurrencyInput.propTypes = {
    name: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    max: PropTypes.number,
    isDisabled: PropTypes.bool,
    isLocked: PropTypes.bool
}

CurrencyInput.defaultProps = {
    max: 7,
    isLocked: false
}


export default React.memo(CurrencyInput);