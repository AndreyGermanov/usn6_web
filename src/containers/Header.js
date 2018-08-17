import {connect} from "react-redux";
import HeaderComponent from '../components/Header';
import Store from '../store/Store';

/**
 * Controller used to manage main NavBar component
 */
class HeaderContainer {

    /**
     * Method defines set of properties, which are available inside controlled component inside "this.props"
     * @param state: Link to application state
     * @param ownProps: Link to component properties (defined in component tag attributes)
     * @returns Array of properties
     */
    mapStateToProps(state) {
        return {
            screen: state.screen
        }
    }

    /**
     * Function defines methods which will be available inside component, which this controller manages
     * @param dispatch - Store dispatch functions, allows to transfer actions to Redux store
     * @returns object of methods, which are available in component
     */
    mapDispatchToProps(dispatch) {
        return {
            /**
             * Method used to set style of each item in NavBar depending on which screen is currently active
             * @param screen: Screen, which item represents
             * @returns {*}
             */
            setStyle: (screen) => {
                var props = Store.store.getState();
                var result = props.screen === screen ? {fontWeight:'bold'}: {fontWeight:'normal'};
                return result;
            }
        }
    }
}

var header = new HeaderContainer();
var Header = connect(header.mapStateToProps.bind(header),header.mapDispatchToProps.bind(header))(HeaderComponent);
export {Header}
export default HeaderContainer;