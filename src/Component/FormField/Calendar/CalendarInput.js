import React from 'react';
import PropTypes from 'prop-types';


const CalendarInput = props => {
    let { isDisabled, onChange, isLocked, onFocus, value, max, ...input } = props;
    

    const handleCalendarFormatting = event => {
        // This input is the same userInput
        let input = event.target.value.replace(/[^\d]/g, '').substring(0, 8);
        const year = input.substring(0, 4);
        const month = input.substring(4, 6);
        const day = input.substring(6, 8);

        // Based upon the length of the input string, we add formatting as necessary
        // This piece is just for automagically adding the '-' within the date format, not date validation.
        if (input.length > 6) {
            input = `${year}-${month}-${day}`;
        } else if (input.length > 4) {
            input = `${year}-${month}`;
        } else if (input.length > 0) {
            input = `${year}`;
        }

        onChange(input);
    };
   
    
    return (
        <input className="flex flex-filler " type="text" value={value} {...input} onChange={handleCalendarFormatting} disabled={isLocked || props.isDisabled} 
               onBlur={onFocus} onFocus={onFocus} />
                       
    );
};



CalendarInput.propTypes = {
    name: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    max: PropTypes.number,
    isDisabled: PropTypes.bool,
    isLocked: PropTypes.bool,
    onChange: PropTypes.func,
}

CalendarInput.defaultProps = {
    max: 10,
    isLocked: false
}

export default React.memo(CalendarInput);