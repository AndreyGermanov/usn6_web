import {connect} from "react-redux";
import HeaderComponent from '../components/Header';
import Models from '../models/Models';
import Backend from '../backend/Backend';

/**
 * Controller used to manage main NavBar component
 */
class HeaderContainer {

    /**
     * Method defines set of properties, which are available inside controlled component inside "this.props"
     * @param state: Link to application state
     * @returns Object of properties
     */
    mapStateToProps(state) {
        return {}
    }

    /**
     * Function defines methods which will be available inside component, which this controller manages
     * @param dispatch - Store dispatch functions, allows to transfer actions to Redux store
     * @returns object of methods, which are available in component
     */
    mapDispatchToProps(dispatch) {
        return {
            setStyle: (screen) => this.setStyle(screen),
            logout: () => this.logout()
        }
    }

    /**
     * Method used to set style of each item in NavBar depending on which screen is currently active
     * @param screen: Screen, which item represents
     * @returns {*}
     */
    setStyle(screen) {
        let hash = window.location.hash.replace('#/','');
        hash = hash.split('/').shift();
        const model = Models.getInstanceOf(screen);
        if (model)
            return model.itemName === hash || model.collectionName === hash ?
                     {fontWeight:'bold'}: {fontWeight:'normal'};
        return {fontWeight:'normal'};
    }

    /**
     * Method which is called when user presses "Logout" link in navigation panel
     */
    logout() {
        Backend.logout();
    }
}

const header = new HeaderContainer();
const Header = connect(header.mapStateToProps.bind(header),header.mapDispatchToProps.bind(header))(HeaderComponent);
export {Header}