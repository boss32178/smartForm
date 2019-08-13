import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const TextboxInput = props => {
    var { isDisabled, isLocked, value, onFocus, max, ...input } = props;
    const [thisValue, setValue] = useState(value);

    const handleTextboxValidation = event => {
        let prettyValue = event.target.value.substring(0, max);;
        setValue(prettyValue);
    };

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <input className="flex flex-filler" type="text" value={thisValue} {...input} onChange={handleTextboxValidation} disabled={props.isLocked || props.isDisabled} 
                onBlur={onFocus} onFocus={onFocus}/>
    );
};

TextboxInput.propTypes = {
    name: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    max: PropTypes.number,
    isDisabled: PropTypes.bool,
    isLocked: PropTypes.bool
}

TextboxInput.defaultProps = {
    max: 45,
    isLocked: false
}

export default React.memo(TextboxInput);