import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const PhoneInput = props => {
    var { isDisabled, isLocked, onFocus, value, max, ...input } = props;
    const [thisValue, setValue] = useState(value);

    const handlePhoneValidation = event => {

        // First ten digits of input only
        let input = event.target.value.replace(/[^\d]/g, '').substring(0, 10);
        const area = input.substring(0, 3);
        const middle = input.substring(3, 6);
        const last = input.substring(6, 10);
        // Based upon the length of the input string, we add formatting as necessary
        if (input.length > 6) {
            input = `(${area}) ${middle}-${last}`;
        } else if (input.length > 3) {
            input = `(${area}) ${middle}`;
        } else if (input.length > 0) {
            input = `(${area}`;
        }
        setValue(input);
    };

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <input className="flex flex-filler" type="text" value={thisValue} {...input} onChange={handlePhoneValidation} disabled={isLocked || props.isDisabled} 
                onBlur={onFocus} onFocus={onFocus}/>
    );
};

PhoneInput.propTypes = {
    name: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    max: PropTypes.number,
    isDisabled: PropTypes.bool,
    isLocked: PropTypes.bool
}

PhoneInput.defaultProps = {
    max: 12,
    isLocked: false
}

export default React.memo(PhoneInput);