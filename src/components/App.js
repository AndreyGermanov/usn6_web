import React, { Component } from 'react';
import {Header} from '../containers/Header'
import '../vendor/bootstrap/css/bootstrap.min.css'
import {HashRouter} from 'react-router-dom'
import {Route,Switch} from 'react-router'
import {Login} from '../containers/Login';
import {ScreenModes} from "../reducers/RootReducer";
import {Account} from '../containers/Account';
import {Income} from '../containers/Income';
import {Spending} from '../containers/Spending';
import {Report} from '../containers/Report';
import {Company} from '../containers/Company';
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
        if (!this.props.isLogin) {
            if (!this.props.authenticating) {
                return <Login/>
            } else {
                return null
            }
        }
        return (
            <div>
                <Header/>
                <div style={{paddingLeft:'15px',paddingRight:'15px'}}>
                    <HashRouter>
                        <Switch>
                            <Route exact path="/accounts" render={() => <Account screenMode={ScreenModes.LIST}/>}/>
                            <Route path="/companies" render={() => <Company screenMode={ScreenModes.LIST}/>}/>
                            <Route path="/incomes" render={() => <Income screenMode={ScreenModes.LIST}/>}/>
                            <Route path="/spendings" render={() => <Spending screenMode={ScreenModes.LIST}/>}/>
                            <Route path="/reports" render={() => <Report screenMode={ScreenModes.LIST}/>}/>

                            <Route path="/company/:uid"
                                   render={(state) => {
                                       return <Company screenMode={ScreenModes.ITEM} uid={state.match.params.uid}/>
                                   }}/>
                            <Route path="/account/:uid"
                                   render={(state) => {
                                       return <Account screenMode={ScreenModes.ITEM} uid={state.match.params.uid}/>
                                   }}/>
                            <Route path="/income/:uid"
                                   render={(state) => {
                                       return <Income screenMode={ScreenModes.ITEM} uid={state.match.params.uid}/>
                                   }}/>
                            <Route path="/spending/:uid"
                                   render={(state) => {
                                       return <Spending screenMode={ScreenModes.ITEM} uid={state.match.params.uid}/>
                                   }}/>
                            <Route path="/report/:uid"
                                   render={(state) => {
                                       return <Report screenMode={ScreenModes.ITEM} uid={state.match.params.uid}/>
                                   }}/>
                            <Route exact path="" render={(state) => {
                                return <Income screenMode={ScreenModes.LIST}/>
                            }}/>
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        );
    }
}

export default App;
