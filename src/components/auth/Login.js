import React, { Component } from 'react';
import t from "../../utils/translate/translate";
import {Panel} from 'react-bootstrap';

class Login extends Component {

    /**
     * Method used to render component
     * @returns {*} Rendered component
     */
    render() {
        return (
            <Panel bsStyle="primary" className="col-sm-6 screen-center">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        {t("Вход")}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {this.props.errors["general"] ?
                        <div style={{marginBottom:'10px'}} align="center"
                             className="alert-danger">{this.props.errors["general"]}
                        </div> :
                        ""
                    }
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2">{t("Имя")}</label>
                            <div className="col-sm-9">
                                <input className="form-control" ref={(elem) => { this.loginField = elem;}}/>
                                {this.props.errors["login"] ?
                                    <span style={{color:'red'}}>{this.props.errors["login"]}</span> :
                                    ""}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2">{t("Пароль")}</label>
                            <div className="col-sm-9">
                                <input type="password" className="form-control"
                                       ref={(elem) => {this.passwordField = elem;}}/>
                                {this.props.errors["password"] ?
                                    <span style={{color:'red'}}>{this.props.errors["password"]}</span> :
                                    ""}
                            </div>
                        </div>
                        <div className="form-group" align="center">
                            <a href="#/request_reset_password">{t("Забыл пароль")+" ?"}</a>
                        </div>
                        <div className="form-group" align="center">
                            <a style={{cursor:'pointer'}} className="btn btn-primary"
                               onClick={() => { this.props.doLogin(this.loginField.value,this.passwordField.value)}}>
                                <i className="glyphicon glyphicon-ok"/>&nbsp;{t("Войти")}
                            </a>
                        </div>
                        <div className="form-group" align="center">
                            <a href="#/register">{t("Регистрация")}</a>
                        </div>
                    </form>
                </Panel.Body>
            </Panel>
        )
    }
}

export default Login;