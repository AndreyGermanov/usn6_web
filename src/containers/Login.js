import {connect} from "react-redux";
import LoginComponent from '../components/Login';
import Backend from '../backend/Backend';
import actions from '../actions/Actions';
import t from '../utils/translate/translate'

/**
 * Controller used to manager Login form component
 */
class LoginContainer {
    /**
     * Method defines set of properties, which are available inside controlled component inside "this.props"
     * @param state: Link to application state
     * @returns Array of properties
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
            doLogin: (login,password) => {
                dispatch(actions.changeProperty('errors',{}));
                if (!login) {
                    dispatch(actions.changeProperty('errors',{"login":t("Введите имя")}));
                    return;
                }
                if (!password) {
                    dispatch(actions.changeProperty('errors',{"password":t("Введите пароль")}));
                    return;
                }
                Backend.login(login,password, function(err) {
                    if (err) {
                        dispatch(actions.changeProperty('errors',{"general":t("Ошибка аутентификации")}));
                    }
                })
            }
        }
    }
}

const login = new LoginContainer();
const Login = connect(login.mapStateToProps.bind(login),login.mapDispatchToProps.bind(login))(LoginComponent);
export {Login}