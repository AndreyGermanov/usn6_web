import async from 'async';
import {connect} from "react-redux";
import {Item} from '../../components/Components';
import DocumentItemContainer from './Document'
import actions from "../../actions/Actions";
import Store from "../../store/Store";
import Models from '../../models/Models';

/**
 * Controller class for Income Item component. Contains all methods and properties, which used by this module.
 */
export default class IncomeItemContainer extends DocumentItemContainer {

    /**
     * Class constructor
     */
    constructor() {
        super();
        this.model = Models.getInstanceOf("income");
    }

    /**
     * Method defines set of properties, which are available inside controlled component inside "this.props"
     * @param state: Link to application state
     * @param ownProps: params from component's tag
     * @returns Array of properties
     */
    mapStateToProps(state,ownProps) {
        return Object.assign(super.mapStateToProps(state,ownProps), {
            "companies_list": state["companies_list"] ? state["companies_list"] : []
        })
    }

    /**
     * Method called after standard "updateItem" action
     */
    updateItem(uid,callback) {
        const self = this;
        async.waterfall([
            (callback) => super.updateItem(uid,callback),
            (callback) => { self.getCompaniesList((companies) => callback(null,companies)) },
            (companies) => {
                Store.store.dispatch(actions.changeProperty('companies_list', companies));
            }
        ], () => callback())
    }

    static getComponent() {
        const income = new IncomeItemContainer();
        return connect(income.mapStateToProps.bind(income),income.mapDispatchToProps.bind(income))(Item.Income);
    }
}


