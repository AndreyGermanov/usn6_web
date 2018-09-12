import {connect} from "react-redux";
import LoginComponent from '../../components/auth/Login';
import Backend from '../../backend/Backend';
import actions from '../../actions/Actions';
import t from '../../utils/translate/translate';
import Store from '../../store/Store'
import AccountItemContainer from "../items/Account";
import {Item} from "../../components/Components";

/**
 * Controller used to manager Login form component
 */
export default class LoginContainer {
    /**
     * Method defines set of properties, which are available inside controlled component inside "this.props"
     * @param state: Link to application state
     * @returns Object of properties
     */
    mapStateToProps(state) {
        return {
            errors: state.errors
        }
    }
    /**
     * Function defines methods which will be available inside component, which this controller manages
     * @param dispatch - Store dispatch functions, allows to transfer actions to Redux store
     * @returns object of methods, which are available in component
     */
    mapDispatchToProps(dispatch) {
        return {
            doLogin: (login,password) => this.doLogin(login,password)
        }
    }

    /**
     * Method implements login action when user presses "Login" button in component
     * @param login: Provided login
     * @param password: Provided password
     */
    doLogin(login,password) {
        Store.store.dispatch(actions.changeProperty('errors',{}));
        if (!login) {
            Store.store.dispatch(actions.changeProperty('errors',{"login":t("Введите имя")}));
            return;
        }
        if (!password) {
            Store.store.dispatch(actions.changeProperty('errors',{"password":t("Введите пароль")}));
            return;
        }
        Backend.login(login,password, function(err) {
            if (err) {
                Store.store.dispatch(actions.changeProperty('errors',{"general":t("Ошибка аутентификации")}));
            } else {
                window.location.reload();
            }
        })
    }

    static getComponent() {
        const login = new LoginContainer();
        return connect(login.mapStateToProps.bind(login),login.mapDispatchToProps.bind(login))(LoginComponent);
    }
}