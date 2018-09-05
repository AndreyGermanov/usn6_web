import React from 'react';
import PropTypes from 'prop-types';
import ScreenComponent from './ScreenComponent';
import _ from 'lodash';

/**
 * Abstract base class for all form components, which accepts input
 */
class FormField extends ScreenComponent {

    // types of properties which component can accept
    static propertyTypes = {
        // Name of field
        name: PropTypes.string.isRequired,
        // Current field value
        value: PropTypes.node,
        // Change field value handler function (name,value) => {}
        onChange: PropTypes.func,
        // Style of input field
        inputStyle: PropTypes.object,
        // Style of label
        labelStyle: PropTypes.object,
        // Style of container
        containerStyle: PropTypes.object,
        // Style of error message
        errorStyle: PropTypes.object,
        // Class of input field
        inputClass: PropTypes.string,
        // Class of label
        labelClass: PropTypes.string,
        // Class of container
        containerClass: PropTypes.string,
        // Class of error message
        errorClass: PropTypes.string,
        // Text of label (optional, if no text, no label)
        label: PropTypes.string
    };

    /**
     * Class constructor
     * @param props
     */
    constructor(props) {
        super(props);
        Object.assign(this.propTypes,FormField.propertyTypes);
    }

    /**
     * Method renders component on the screen
     * @returns Array Rendered component
     */
    render() {
        return null;
    }

    /**
     * Method used to fill default values for "props" of component
     * @returns this.props filled with default values
     */
    getProps() {
        let result = super.getProps();
        result.inputStyle = result.inputStyle ? result.inputStyle : {};
        result.containerStyle = result.containerStyle ? result.containerStyle: {};
        result.labelStyle = result.labelStyle ? result.labelStyle: {};
        result.inputClass = result.inputClass ? 'form-control '+result.inputClass: 'form-control';
        result.labelClass = result.labelClass ? 'control-label '+result.labelClass: 'control-label col-sm-2';
        result.containerClass = result.containerClass ? result.containerClass : "col-sm-10";
        result.errorClass = result.errorClass ? result.errorClass: 'error';
        result.onChange = result.onChange ? result.onChange : result.ownerProps.changeItemField;
        result.value = result.value ? result.value : null;
        result.label = result.label ? result.label : '';
        return result;
    }
}

FormField.propTypes = (new FormField()).propTypes;


export default FormField;