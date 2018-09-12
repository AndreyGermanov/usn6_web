import React, { Component } from 'react';
import '../vendor/bootstrap/css/bootstrap.min.css'
import {HashRouter} from 'react-router-dom'
import {Route,Switch} from 'react-router'
import {List,Item,Auth} from '../containers/Containers';
import '../styles/App.css';

/**
 * Main application components, used to display navigation and current application screen
 */
class App extends Component {


    /**
     * Main method which renders component
     * @returns Rendered components
     */
    render() {
        const Accounts = List.getComponentOf("account");
        const Companies = List.getComponentOf("company");
        const Incomes = List.getComponentOf("income");
        const Spendings = List.getComponentOf("spending");
        const Reports = List.getComponentOf("report");

        const Account = Item.getComponentOf("account");
        const Company = Item.getComponentOf("company");
        const Income = Item.getComponentOf("income");
        const Spending = Item.getComponentOf("spending");
        const Report = Item.getComponentOf("report");

        const Login = Auth.getComponentOf("login");
        const Register = Auth.getComponentOf("register");
        const RequestResetPassword = Auth.getComponentOf("request_reset_password");
        const ResetPassword = Auth.getComponentOf("reset_password");

        if (!this.props.isLogin) {
            if (!this.props.authenticating) {
                return (
                    <HashRouter>
                        <Switch>
                            <Route path="/register" render={() => <Register/>}/>
                            <Route path="/request_reset_password" render={() => <RequestResetPassword/>}/>
                            <Route path="/reset_password/:token" render={() => <ResetPassword/>}/>
                            <Route render={() => <Login/>}/>
                        </Switch>
                    </HashRouter>
                )
            } else {
                return null
            }
        }
        return (
            <div>
                <div style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    <HashRouter>
                        <Switch>
                            <Route exact path="/accounts" render={() => <Accounts/>}/>
                            <Route path="/companies" render={() =>  <Companies/>}/>
                            <Route path="/incomes" render={() =>  <Incomes/>}/>
                            <Route path="/spendings" render={() =>  <Spendings/>}/>
                            <Route path="/reports" render={() =>  <Reports/>}/>
                            <Route path="/company/:uid"
                                   render={(state) => {
                                       return <Company uid={state.match.params.uid}/>
                                   }}/>
                            <Route path="/account/:uid"
                                   render={(state) => {
                                       return <Account uid={state.match.params.uid}/>
                                   }}/>
                            <Route path="/income/:uid"
                                   render={(state) => {
                                       return <Income uid={state.match.params.uid}/>
                                   }}/>
                            <Route path="/spending/:uid"
                                   render={(state) => {
                                       return <Spending uid={state.match.params.uid}/>
                                   }}/>
                            <Route path="/report/:uid"
                                   render={(state) => {
                                       return <Report uid={state.match.params.uid}/>
                                   }}/>
                            <Route exact path="" render={() => {
                                return <Incomes/>
                            }}/>
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.tryLogin();
    }
}

export default App;