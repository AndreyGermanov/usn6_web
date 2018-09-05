import React from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import Error from './FieldErrorMessage';

/**
 * Component used to display Input field in the form
 */
class FormInputField extends FormField {

    // types of properties which component can accept
    static propertyTypes = {
        // Is input field multiline (true or false)
        multiline: PropTypes.bool,
        // Should input field work in password enter mode
        password: PropTypes.bool
    };

    /**
     * Class constructor
     * @param props
     */
    constructor(props) {
        super(props);
        Object.assign(this.propTypes,FormInputField.propertyTypes);
    }

    /**
     * Method renders component on the screen
     * @returns Array Rendered component
     */
    render() {
        const props = this.getProps();
        const inputType = props.password ? 'password' : 'text';
        return [
            props.label ?
                <label className="control-label col-sm-2">
                    {props.label}
                </label> : '',
            <div className={props.containerClass} style={props.containerStyle}>
                {!props.multiline ?
                    <input className={props.inputClass} style={props.inputStyle} value={props.value}
                           onChange={(value) => props.onChange(props.name, value)} type={inputType}/> :
                    <textarea className={props.inputClass} style={props.inputStyle} value={props.value}
                              onChange={(value) => props.onChange(props.name, value)}/>
                }
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
        result.mulitline = result.mulitline ? result.multiline: false;
        result.password = result.password ? result.password : false;
        return result;
    }
}

FormInputField.propTypes = (new FormInputField()).propTypes;

export default FormInputField;