import {connect} from "react-redux";
import AppComponent from '../components/App';
import Backend from '../backend/Backend';


/**
 * Controller class for main "App" component. Provides properties and event handlers for this component
 */
class AppContainer {

    /**
     * Method returns list of properties, which are available inside component
     * @param state: Link to applicaiton state
     * @returns Object in which keys are property names and values are property values
     */
    mapStateToProps(state) {
        return {
            isLogin: state.isLogin,
            authenticating: state.authenticating
        }
    }

    /**
     * Method tries to login to backend using authentication token
     * in browser cookie during initial screen load.
     */
    tryLogin() {
        Backend.login(null,null);
    }

    /**
     * Method returns list of methods, which are available inside component
     * @param dispatch: Link to Redux dispatch function, which allows to send actions and modify Redux Store
     * @returns Object in which keys are method names and values are methods
     */
    mapDispatchToProps(dispatch) {
        const self = this;
        return {
            tryLogin: () => self.tryLogin()
        }
    }
}

const app = new AppContainer();
const App = connect(app.mapStateToProps.bind(this),app.mapDispatchToProps.bind(app))(AppComponent);
export {App}