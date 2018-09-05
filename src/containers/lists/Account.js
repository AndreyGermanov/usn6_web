import {connect} from "react-redux";
import {List} from '../../components/Components';
import EntityListContainer from './Entity';
import Models from "../../models/Models";

/**
 * Controller class for Account List component. Contains all methods and properties, which used by this module.
 */
export default class AccountListContainer extends EntityListContainer {

    /**
     * Class constructor
     */
    constructor() {
        super();
        this.model = Models.getInstanceOf("account");
    }

    /**
     * Method defines set of properties, which are available inside controlled component inside "this.props"
     * @param state: Link to application state
     * @param ownProps: Params passed from tag properties
     * @returns Array of properties
     */
    mapStateToProps(state,ownProps) {
        const result = super.mapStateToProps(state,ownProps);
        return Object.assign(result, {
            "listColumns": this.getListColumns(['number','bik','bank_name','company']),
            "sortOrder": (result["sortOrder"] && result["sortOrder"].field) ?
                result["sortOrder"] : {field:'number',direction:'ASC'}
        })
    }

    static getComponent() {
        const account = new AccountListContainer();
        return connect(account.mapStateToProps.bind(account),account.mapDispatchToProps.bind(account))(List.Account);
    }
}