import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import styles from './CalendarDropDown.module.css';
import '../../../css/calendar.css'

const CalendarDropDown = props => {

    const handleSelectToday = () => {
        onDateSelection(new Date());
    };
    
    const handleClear = () => {
        props.onCalendarSelection("");
    }

    const onDateSelection = newDate => {
        const dateDisplay = newDate.toISOString().slice(0,10);
        props.onCalendarSelection(dateDisplay);  //call to return selected value
    };

    const closeCalendar = () => {
        props.setShowCalendar();
    };

    return (
        <div name={props.name} className={props.className + ' '+ styles.calendarDropDown}>
            <Calendar className={styles.reactCalendar} onChange={onDateSelection} value={props.value} maxDate={new Date()}/>        
            <div className={`flex flex-filler ${styles.calButtonBar}`}>
                <span className="btn-group pull-left">
                <button className={`btn btn-sm btn-info ${styles.calButton}`} type="button" value="Today" onClick={handleSelectToday}>Today</button>
                <button className={`btn btn-sm btn-danger ${styles.calButton}`} type="button" value="Clear" onClick={handleClear}>Clear</button>
                </span>
                <button className={`btn btn-sm btn-success ${styles.calButton}`} type="button" value="Close" onClick={closeCalendar}>Close</button>
            </div>
        </div>
    );
};

CalendarDropDown.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.objectOf(Date),                //initial string value
    onCalendarSelection: PropTypes.func.isRequired,    //function to call when calendar selection has been made
    setShowCalendar: PropTypes.func.isRequired,
    className: PropTypes.string
}

CalendarDropDown.defaultProps = {
    value: new Date()
}


export default React.memo(CalendarDropDown);