import React from 'react';
import PropTypes from 'prop-types';
import Error from './FieldErrorMessage';
import FormField from './FormField';
import moment from "moment-timezone";
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'


/**
 * Component used to display Date and Time select field in the form
 */
class FormDateTimeField extends FormField {

    // types of properties which component can accept
    static propertyTypes = {
        // Mode of date/time selector (days, years, months, time)
        mode: PropTypes.string,
        // Format of date display (as defined in moment.js)
        dateFormat: PropTypes.string,
        // Format of time display (as defined in moment.js)
        timeFormat: PropTypes.string

    };

    /**
     * Class constructor
     * @param props
     */
    constructor(props) {
        super(props);
        Object.assign(this.propTypes, FormDateTimeField.propertyTypes);
    }

    /**
     * Method renders component on the screen
     * @returns Array Rendered component
     */
    render() {
        const props = this.getProps();
        return [
            props.label ?
            <label className={props.labelClass} style={props.labelStyle}>
                {props.label}
            </label> : '',
            <div className={props.containerClass} style={props.containerStyle}>
                <DateTime value={moment(props.value*1000)}
                          onChange={(value) => props.onChange(props.name,value)}
                          dateFormat={props.dateFormat}
                          timeFormat={props.timeFormat}
                          viewMode={props.mode}
                />
                <Error fieldName={props.name} ownerProps={props.ownerProps} className={props.errorClass}
                       style={props.errorStyle}/>
            </div>
        ]
    }

    /**
     * Method used to fill default values for "props" of component
     * @returns this.props filled with default values
     */
    getProps() {
        let result = super.getProps();
        result.mode = result.mode ? result.mode: "days";
        result.dateFormat = result.dateFormat ? result.dateFormat : "YYYY-MM-DD";
        result.timeFormat = result.timeFormat ? result.timeFormat : "HH:mm:ss";
        return result;
    }
}

FormDateTimeField.propTypes = (new FormDateTimeField()).propTypes;

export default FormDateTimeField;