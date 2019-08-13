import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const ZipInput = props => {
    var { isDisabled, isLocked, value, onFocus, ...input } = props;
    const [thisValue, setValue] = useState(value);

    const handleZipValidation = event => {

        let input = event.target.value.replace(/[^\d]/g, '').substring(0,9);
        const zip = input.substring(0, 5);
        const extended = input.substring(5, 9);

        if (input.length > 5) {
            input = `${zip}-${extended}`;
        } else if (input.length > 0) {
            input = `${zip}`;
        } 
        
        setValue(input);
    };

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <input className="flex flex-filler" type="text" value={thisValue} {...input} onFocus={onFocus} onChange={handleZipValidation}  
                onBlur={onFocus} disabled={props.isLocked || props.isDisabled}/>
    );
};

ZipInput.propTypes = {
    name: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    max: PropTypes.number,
    isDisabled: PropTypes.bool,
    isLocked: PropTypes.bool
}

ZipInput.defaultProps = {
    max: 10,
    isLocked: false
}

export default React.memo(ZipInput);