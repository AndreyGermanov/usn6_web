import async from 'async';
import {connect} from "react-redux";
import {Item} from '../../components/Components';
import DocumentItemContainer from './Document'
import t from '../../utils/translate/translate'
import actions from "../../actions/Actions";
import Store from "../../store/Store";
import Models from '../../models/Models';

/**
 * Controller class for Report Item component. Contains all methods and properties, which used by this module.
 */
export default class ReportItemContainer extends DocumentItemContainer {

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
        return Object.assign(super.mapStateToProps(state,ownProps), {
            companies_list: state["companies_list"] ? state["companies_list"] : [],
            report_types: state["report_types"] ? state["report_types"] : []
        })
    }

    /**
     * Function defines methods which will be available inside component, which this controller manages
     * @param dispatch - Store dispatch functions, allows to transfer actions to Redux store
     * @returns object of methods, which are available in component
     */
    mapDispatchToProps(dispatch) {
        return Object.assign(super.mapDispatchToProps(dispatch), {
            generateReport: (format) => this.generateReport(format),
            sendByEmail: () => this.sendByEmail()
        });
    }

    /**
     * Method called after standard "updateItem" action
     */
    updateItem(uid,callback) {
        const self = this;
        if (!callback) callback = () => null;
        async.waterfall([
            (callback) => super.updateItem(uid,callback),
            (callback) => self.getCompaniesList((companies) => callback(null,companies)),
            (companies,callback) => self.model.getTypes((error,types) => callback(null,companies,types)),
            (companies,types,callback) => {
                Store.store.dispatch(actions.changeProperties({
                    'companies_list':companies,
                    'report_types':types
                }));
                callback()
            }
        ], () => callback());
    }

    /**
     * Method called when user presses button "Сформировать" or "Загрузить PDF"
     * @param format: Format of report: Either "html" or "pdf"
     */
    generateReport(format) {
        const errors = this.model.generateReport(this.getProps().item,format);
        if (errors) {
            Store.store.dispatch(actions.changeProperty("errors",errors));
        }
    }

    /**
     * Method used to send report in PDF format to specified email
     * @param callback: Function called after process finished
     */
    sendByEmail(callback) {
        const self = this;
        if (!callback) callback = () => null;
        if (!this.isValidForEmail()) {
            callback();
            return;
        }
        const item = this.getProps().item;
        Store.store.dispatch(actions.changeProperty('isUpdating',true));
        this.model.sendByEmail(item, (err,response) => {
            self.processSendByEmailResponse(err,response,callback)
        })
    }

    /**
     * Utility method used to make form validation when user presses "Send by email" button
     * @returns Boolean - True if form is valid and false otherwise
     */
    isValidForEmail() {
        Store.store.dispatch(actions.changeProperty("errors",{}));
        const item = this.getProps().item;
        let errors = this.model.validate(item);
        if (!errors) errors = {};
        if (!item["email"] || !item["email"].trim())
            errors['email'] = t("Укажите адрес email");
        if (Object.keys(errors).length)
            Store.store.dispatch(actions.changeProperty('errors',errors));
        return !Object.keys(errors).length;
    }

    /**
     * Utility method used to handle response from server after user presses "Send by email" button
     * @param err - Error object
     * @param response - Server response object
     * @param callback - Function called after method executed
     */
    processSendByEmailResponse(err,response,callback) {
        if (!callback) callback = () => null;
        Store.store.dispatch(actions.changeProperty('isUpdating',false));
        if (err) {
            Store.store.dispatch(actions.changeProperty('errors',{'general': t("Системная ошибка")}));
            callback();
            return;
        }
        const self = this;
        response.text().then((text) => {
            if (text && text.length) {
                Store.store.dispatch(actions.changeProperty('errors',{'general':text}));
                callback();
            } else {
                self.displaySuccessText();
                callback();
            }
        }).catch(function() {
            callback();
        })
    }

    static getComponent() {
        const report = new ReportItemContainer();
        return connect(report.mapStateToProps.bind(report),report.mapDispatchToProps.bind(report))(Item.Report);
    }
}