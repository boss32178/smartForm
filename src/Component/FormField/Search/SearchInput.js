import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {getHighlightedText} from '../../Hooks/HighlightText';
import {useFetchAPIData} from '../../Hooks/FetchAPIData';
import flexStyles from '../../../css/flex.module.css';
import styles from '../FormField.module.css';
import dropDown from './SearchInput.module.css';


const SearchInput = props => {
    const { isDisabled, optionalClass, labelText, hasSecondLine, labelClass, helpText, searchList, isLockable, isLocked, value, onSetLocked, url, onUpdateDealer, ...input } = props;
    const [thisValue, setValue] = useState(value);
    const [dropDownList, setDropDownList] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const [hasError, setError] = useState(false);
    const [showLoading, setLoading] = useState(false);
    const [hasFocus, setFocus] = useState(false);
    const [sendSearchText, setSendSearchText] = useState("");
    const [isLoading, fetchData, error] = useFetchAPIData(url, sendSearchText);


    let lockSpan, hasHelpSpan, dropDownSection, componentClass = `flex align-center flex-filler ${styles.border}`;

    const handleSearch = event => {
        event.preventDefault();
        let showDropDown = false;
        const searchText = event.target.value;

        if (searchText.length > 2) {
            setSendSearchText(searchText);
            setLoading(true);
            showDropDown = true;
            let returnList;

            if (searchList) {
                if (searchList.dealers) {
                    returnList = searchList.dealers.filter((currentValue, i) => {
                        return currentValue.display_title.toLowerCase().includes(searchText.toLowerCase()) ||
                        currentValue.display_description.toLowerCase().includes(searchText.toLowerCase());
                    });
                };   
                setLoading(false);
            } else {
                if (fetchData) {
                    if (fetchData.dealers) returnList = fetchData.dealers;
                    setError(error);
                    setLoading(isLoading);
                } else {
                    setError(true);
                }; 
            }
            setDropDownList(returnList);
        }
        
        setShowDropDown(showDropDown);
        setValue(searchText);
    };

    const handelSetFocus = () => {
        setFocus(!hasFocus);
        setShowDropDown(false);
    };

    const handelSearchClick = event => {
        const dealerId = event.currentTarget.getAttribute("data-value");
        const selectedDealer = dropDownList.find((item)=>{
            return  item.dealer_id === dealerId;
        });

        onUpdateDealer(selectedDealer);
        setShowDropDown(false);
        setValue("");
    };

    useEffect(() => {
        setValue(value);
    }, [value]);

    if (optionalClass) {
        componentClass = `${componentClass} ${optionalClass}`;
    };

    if (helpText){
        hasHelpSpan = (
          <span className={styles.helpMessage}>{props.helpText}</span>
        );
    }
    
    if(hasFocus) {
        componentClass = `${componentClass} ${styles.hasFocus}`;
    };

    if (isLockable && !isDisabled) {
        if(isLocked){
            lockSpan = (<div className={`flex align-center btn-sm btn-default ${styles.button}`} alt="locked" onClick={props.onSetLocked}>
                            <span className={`glyphicon glyphicon-lock ${styles.icon}`}></span>
                        </div>);
            componentClass = `${componentClass} ${styles.isLocked}`;
        } else {
            lockSpan = (<div className={`flex align-center btn-sm btn-default ${styles.button}`} alt="unlocked" onClick={props.onSetLocked}>
                            <span className={`glyphicon glyphicon-ban-circle ${styles.icon}`}></span>
                        </div>);
        };
    } else if (isDisabled) {
        componentClass = `${componentClass} ${styles.isLocked}`;
    };

    if (showDropDown) {
        let searchList = ( <div className={dropDown.message}>No results found</div> );

        if(dropDownList) {
            if ( dropDownList.length > 0) {
                searchList = dropDownList.map((item, i) => {
                    const displayDescription = getHighlightedText(item.display_description,thisValue);
                    const displayTitle =  getHighlightedText(item.display_title,thisValue);
                    let displayTitleText = <span className={styles.title}>{displayTitle}</span>
                    return <div className={dropDown.dealer} key={i} data-value={item.dealer_id} onMouseDown={handelSearchClick}>{displayTitleText}{displayDescription}</div>
                });
            };
        };

        if (showLoading) searchList = ( <div className={dropDown.message}>Searching...</div> );
        if (hasError)  searchList = ( <div className={dropDown.message}>Error searching results</div> );

        dropDownSection = (
            <div className={`flex-filler ${dropDown.dropDown}`}>
                {searchList}
            </div>
        );
    };

    let labelSpanContent, labelSpanSpacer;
    if (labelText !== undefined && labelText.length)
    {
        labelSpanContent =  <span className={labelClass}>{labelText}</span>
        labelSpanSpacer =   <span className={labelClass}></span>
    }  

  let secondLine = "";
  let secondLineStyle = styles.helperParent;
   if ((props.hasSecondLine) && (props.helpText)){
     secondLineStyle = styles.helperParentMargin;
   }
   if (props.hasSecondLine){
    secondLine =       
    <div className={` ${secondLineStyle} ${flexStyles.flex} ${flexStyles.flexFill} `}>
        {labelSpanSpacer}
        <span className={styles.helperComponent}>
            {hasHelpSpan}
        </span>
    </div>
  }


    return (
        <>
        <label className={`flex align-center ${styles.marginClass} ${styles.componentParent}`}>
          {labelSpanContent}
            <div className="flex flex-filler">
                <span className={`${componentClass} ${dropDown.relativePosition}`}>
                    <input className="flex flex-filler" type="text" placeholder="Start typing dealer name or number. Min 3 characters required" 
                        value={thisValue} {...input} onChange={handleSearch} 
                        disabled={props.isLocked || props.isDisabled} onBlur={handelSetFocus} onFocus={handelSetFocus}/>
                    {dropDownSection}
                </span>
                {lockSpan}
            </div>
        </label>
        {secondLine}
        </>
    );
};

SearchInput.propTypes = {
    name: PropTypes.string.isRequired,
    onUpdateDealer: PropTypes.func.isRequired,
    onSetLocked: PropTypes.func,
    searchList: PropTypes.object,
    tabIndex: PropTypes.number,
    value: PropTypes.string,
    url: PropTypes.string,
    optionalClass: PropTypes.string,
    labelText: PropTypes.string,
    labelClass: PropTypes.string,
    hasSecondLine: PropTypes.bool,
    isLockable: PropTypes.bool,
    isLocked: PropTypes.bool,
    isDisabled: PropTypes.bool,
}

SearchInput.defaultProps = {
    isLocked: false,
    hasSecondLine: true
}

export default React.memo(SearchInput);