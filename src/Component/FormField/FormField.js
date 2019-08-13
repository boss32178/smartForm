import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import styles from './FormField.module.css';
import flexStyles from './../../css/flex.module.css';
import ErrorPage from './Error/error';
import Loading from './Loading/Loading';
import * as Utils from './../../General/Utils.js';

const LoadingComponent = ({ isLoading, error }) => {
  //Handle the loading state
  if (isLoading) {
    return <Loading />;
  } else if (error) {
    //Handle the error state
    return <ErrorPage />;
  } else {
    return null;
  }
};

const PercentageInput = Loadable({
  loader: () => import('./Percentage/PercentageInput.js'),
  loading: LoadingComponent,
});
const ZipInput = Loadable({
  loader: () => import('./Zip/ZipInput'),
  loading: LoadingComponent,
});
const TextboxInput = Loadable({
  loader: () => import('./Textbox/TextboxInput'),
  loading: LoadingComponent,
});
const PhoneInput = Loadable({
  loader: () => import('./Phone/PhoneInput'),
  loading: LoadingComponent,
});
const NumericInput = Loadable({
  loader: () => import('./Numeric/NumericInput.js'),
  loading: LoadingComponent,
});
const CurrencyInput = Loadable({
  loader: () => import('./Currency/CurrencyInput'),
  loading: LoadingComponent,
});
const DropDownInput = Loadable({
  loader: () => import('./DropDown/DropDownInput'),
  loading: LoadingComponent,
});
const CalendarInput = Loadable({
  loader: () => import('./Calendar/CalendarInput'),
  loading: LoadingComponent,
});
const CalendarDropDown = Loadable({
  loader: () => import('./Calendar/CalendarDropDown'),
  loading: LoadingComponent,
});

const FormField = props => {
  var { fieldType, onSetLocked, labelText, inputWidthClass, hasSecondLine, labelTagClass, labelClass, hasError, dataList, onCalculate, helpText, optionalClass, errorMessage, isLockable, ...other} = props;
  const[formValue, setFormValue] = useState(props.value);
  const[hasFocus, setFocus] = useState(false);
  const[showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setFormValue(props.value);
  }, [props.value]);

  const handelSetFocus = () => {
    setFocus(!hasFocus);
  }

  const handleShowCalendar = () => {
   setShowCalendar( !showCalendar);
  }

  const saveCalendarSelection = (selectedValStr) => {
    // Save from Calendar drop down
    setFormValue(selectedValStr);
    handleShowCalendar();
  }

  let inputField, componentClass = `flex align-center flex-filler ${styles.border} `,
  lockSpan, calendarSpan, hasHelpSpan, hasCalculate, actionButtonSpan;

  
  if (optionalClass) {
    componentClass = ` ${componentClass} ${optionalClass} `;
  }
  


  if (hasError) {
    componentClass = ` ${componentClass} ${styles.hasError} `;
  }
  
  if (isLockable && !props.isDisabled){
    if(props.isLocked){
      lockSpan = (<div className={`flex align-center btn-sm btn-default ${styles.button}`} alt="locked" onClick={props.onSetLocked}>
                    <span className={`glyphicon glyphicon-lock ${styles.icon}`}></span>
                  </div>);
      componentClass = [componentClass, styles.isLocked].join(' ');
    } else {
      lockSpan = (<div className={`flex align-center btn-sm btn-default ${styles.button}`} alt="unlocked" onClick={props.onSetLocked}>
                    <span className={`glyphicon glyphicon-ban-circle ${styles.icon}`}></span>
                  </div>);
    };
  } else if (props.isDisabled){
    componentClass = ` ${componentClass} ${styles.isLocked} `;
  }
  
  if (onCalculate){
    hasCalculate = (
        <span className={`glyphicon glyphicon-flash ${styles.icon}`} alt="locked" onClick={props.onCalculate}/>
    );
  }

  if (helpText) {
    hasHelpSpan = (
      <span className={styles.helpMessage}>{props.helpText}</span>
    );
  }

  if(hasFocus){
    componentClass = ` ${componentClass} ${styles.hasFocus} `;
  }


  if (fieldType === 'Calendar')
  {
    actionButtonSpan = (
        <div className={`flex align-center btn-sm btn-default ${styles.button}`} alt='calendar' onClick={handleShowCalendar}>
            <span className={`glyphicon glyphicon-calendar ${styles.icon}`}></span>
        </div>
    );
  }


  if (!labelClass) {
    labelClass = `flex align-center ${styles.inputLabel}`;
  } else {
    labelClass = `${labelClass} flex align-center ${styles.inputLabel}`;
  }


  if (!inputWidthClass) {
    inputWidthClass = `flex flex-filler`;
  } else {
    inputWidthClass = `${inputWidthClass} flex flex-filler`;
  }


  const components = {
    "Currency": <CurrencyInput {...other} onFocus={handelSetFocus} />,
    "Numeric": <NumericInput {...other} onFocus={handelSetFocus} />,
    "DropDown": <DropDownInput {...other} onFocus={handelSetFocus} dataList={dataList} />,
    "Percentage": <PercentageInput {...other} onFocus={handelSetFocus} />,
    "Textbox": <TextboxInput {...other} onFocus={handelSetFocus} />,
    "Phone": <PhoneInput {...other} onFocus={handelSetFocus} />,
    "Zip": <ZipInput {...other} onFocus={handelSetFocus} />,
    "Calendar": <CalendarInput {...other} value={formValue} onFocus={handelSetFocus} onChange={setFormValue} />,
  };

  inputField = components[fieldType || "Textbox"];
  let helperStyle = ` ${styles.helperComponent} `;

if (showCalendar && !props.isLocked) {
    let startDate = new Date();
    let input = formValue.replace(/[^\d]/g, '').substring(0, 8);
    const year = input.substring(0, 4);
    const month = input.substring(4, 6);
    const day = input.substring(6, 8);
    if (Utils.validateDate(year, month, day))
      startDate = Utils.convertStringToDate(year, month, day);

    helperStyle = ` ${styles.helperComponent} ${styles.helperComponentRelative} `;  
    calendarSpan = <CalendarDropDown {...other} value={startDate} setShowCalendar={setShowCalendar} onCalendarSelection={saveCalendarSelection} className={styles.dropDownComponent} />
  }

  let completeField;

  completeField =
    <div className={inputWidthClass}>
      <div className={componentClass}>
        {inputField}
      </div>
      {actionButtonSpan}
      {lockSpan}
      {hasCalculate}
    </div>

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
        <span className={helperStyle}>
            {calendarSpan}
            {hasHelpSpan}
        </span>
    </div>
  }

  return (
    <>
      <label className={`flex align-center ${styles.clearLabel} ${styles.componentParent} ${props.labelTagClass}`}>
        {labelSpanContent}
        {completeField}      
      </label> 
      {secondLine}

    </>
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  fieldType: PropTypes.oneOf([
    'Currency',
    'Numeric',
    'DropDown',
    'Percentage',
    'Textbox',
    'Phone',
    'Zip',
    'Calendar'
  ]).isRequired,
  value: PropTypes.string,    //holds the value of the form field
  onSetLocked: PropTypes.func,
  onCalculate: PropTypes.func,
  helpText: PropTypes.string,
  optionalClass: PropTypes.string,
  hasError: PropTypes.bool,
  // errorMessage: PropTypes.string,
  labelText: PropTypes.string,   //text in the span within the label
  labelClass: PropTypes.string, //class on the span within the label
  labelTagClass: PropTypes.string, //class on the label tag itself
  tabIndex: PropTypes.number,
  max: PropTypes.number,
  dataList: PropTypes.array,
  isLockable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLocked: PropTypes.bool,
  hasSecondLine: PropTypes.bool
}

FormField.defaultProps = {
  hasError: false,
  hasSecondLine: true
}



export default React.memo(FormField);

