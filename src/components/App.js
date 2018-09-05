import React, { Component } from 'react';
import '../vendor/bootstrap/css/bootstrap.min.css'
import {HashRouter} from 'react-router-dom'
import {Route,Switch} from 'react-router'
import {Login} from '../containers/Login';
import {List,Item} from '../containers/Containers';
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

        if (!this.props.isLogin) {
            if (!this.props.authenticating) {
                return <Login/>
            } else {
                return null
            }
        }
        return (
            <div>
                <div style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    <HashRouter>
                        <Switch>
                            <Route exact path="/accounts" render={(state) => <Accounts/>}/>
                            <Route path="/companies" render={(state) =>  <Companies/>}/>
                            <Route path="/incomes" render={(state) =>  <Incomes/>}/>
                            <Route path="/spendings" render={(state) =>  <Spendings/>}/>
                            <Route path="/reports" render={(state) =>  <Reports/>}/>

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