import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const NumericInput = props => {
    var { isDisabled, isLocked, onFocus, value, max, ...input } = props;
    const [thisValue, setValue] = useState(value);
    

    const handleNumberValidation = event => {
        //Remove non Numeric and decimals characters.
        let cleanValue = event.target.value.replace(/[^\d]/g,'').substring(0,max);
        setValue(cleanValue);
    };

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <input className="flex flex-filler" type="text" value={thisValue} {...input} onChange={handleNumberValidation}
                disabled={isLocked || isDisabled}  onBlur={onFocus} onFocus={onFocus} />
    );
};

NumericInput.propTypes = {
    name: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    max: PropTypes.number,
    isDisabled: PropTypes.bool,
    isLocked: PropTypes.bool
}

NumericInput.defaultProps = {
    max: 45,
    isLocked: false
}


export default React.memo(NumericInput);