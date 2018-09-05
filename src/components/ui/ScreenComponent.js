import {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * Component used to define any component which should be displayed on the screen
 * and have link to owning component properties
 */
class ScreenComponent extends Component {
    /**
     * Class constructor
     * @param props: Properties, directly assigned to component
     */
    constructor(props) {
        super(props);
        this.propTypes = {
            ownerProps: PropTypes.object // Link to "props" of owner component
        }
    }

    /**
     * Method to render component body of component
     */
    render() {
        return null
    }

    /**
     * Method used to fill default values for "props" of component
     * @returns this.props filled with default values
     */
    getProps() {
        return _.cloneDeep(this.props);
    }
}

ScreenComponent.propTypes = (new ScreenComponent()).propTypes;

export default ScreenComponent;