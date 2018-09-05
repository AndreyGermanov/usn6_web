import {connect} from "react-redux";
import {List} from '../../components/Components';
import DocumentListContainer from './Document'
import actions from "../../actions/Actions";
import Store from "../../store/Store";
import Models from '../../models/Models';

/**
 * Controller class for Report component. Contains all methods and properties, which used by this module.
 */
export default class ReportListContainer extends DocumentListContainer {

    /**
     * Class constructor
     */
    constructor() {
        super();
        this.model = Models.getInstanceOf("report");
    }

    /**
     * Method defines set of properties, which are available inside controlled component inside "this.props"
     * @param state: Link to application state
     * @param ownProps: Params from component's tag
     * @returns Array of properties
     */
    mapStateToProps(state,ownProps) {
        const result = super.mapStateToProps(state,ownProps);
        return Object.assign(result, {
            "listColumns": this.getListColumns(["date","period","type","company"]),
            "sortOrder": (result["sortOrder"] && result["sortOrder"].field) ?
                result["sortOrder"] : {field:'date',direction:'ASC'},
            "report_types": state["report_types"] ? state["report_types"] : []
        })
    }

    /**
     * Method used to refresh list items from backend. It makes request to backend,
     * including search filter, current page and sort order and sets "list" state variable
     * based on returned result
     * @param options: Filter and other options to generate list
     */
    updateList(options={}) {
        super.updateList(options);
        this.model.getTypes((error,report_types) => {
            Store.store.dispatch(actions.changeProperty('report_types',report_types));
        });
    }

    static getComponent() {
        const report = new ReportListContainer();
        return connect(report.mapStateToProps.bind(report),report.mapDispatchToProps.bind(report))(List.Report);
    }
}