import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DropDownInput = props => {
    var { isDisabled, dataList, isLocked, onFocus, value, ...input } = props;
    const [thisValue, setValue] = useState(value);
    

    const handleOnChange = event => {
        setValue(event.target.value);
    };
    
    let option;
    
    if (dataList){
        option= dataList.map((item, i) => {
            let value = item.value ? item.value : item;
            let label = item.label ? item.label : item;
            return <option key={i} value={value}>{label}</option>
        });
    }

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <select className="flex flex-filler"  value={thisValue} {...input} onChange={handleOnChange}
                disabled={isLocked || isDisabled} onBlur={onFocus} onFocus={onFocus}>
              {option}
        </select>
    );
};

DropDownInput.propTypes = {
    name: PropTypes.string.isRequired,
    dataList: PropTypes.array.isRequired,
    onFocus: PropTypes.func.isRequired,
    tabIndex: PropTypes.number,
    value: PropTypes.string,
    isDisabled: PropTypes.bool,
    isLocked: PropTypes.bool
}

DropDownInput.defaultProps = {
    isLocked: false
}


export default React.memo(DropDownInput);