import React from 'react';
import PropTypes from 'prop-types';
import ScreenComponent from './ScreenComponent';

/**
 * Component used to display Error message related to field
 */
class FieldErrorMessage extends ScreenComponent {
    /**
     * Class constructor
     * @param props: Properties, directly assigned to component
     */
    constructor(props) {
        super(props);
        // Name of field, for which error message is intended
        this.propTypes["fieldName"] = PropTypes.string.isRequired
    }

    /**
     * Method to render component body
     */
    render() {
        const errors = this.props.ownerProps.errors;
        return errors[this.props.fieldName] && errors[this.props.fieldName].length ?
            <span className={this.props.className} style={this.props.style}>{errors[this.props.fieldName]}</span> : null
    }
}

FieldErrorMessage.propTypes = (new FieldErrorMessage()).propTypes;

export default FieldErrorMessage;