import {connect} from "react-redux";
import ReportComponent from '../components/Report'
import DocumentContainer from './Document'
import t from '../utils/translate/translate'
import actions from "../actions/Actions";
import Backend from "../backend/Backend";
import Store from "../store/Store";
import moment from "moment-timezone";
import backendConfig from '../config/backend';

/**
 * Controller class for Report component. Contains all methods and properties, which used by this module.
 */
class ReportContainer extends DocumentContainer {

    constructor() {
        super();
        this.model = "report";
        this.listTitle = t("Отчеты");
        this.itemTitle = t("Отчет");
    }

    /********************************************************
     * Functions used to convert field value from a form    *
     * which it has in input to the form which accepted by  *
     * application state                                    *
     ********************************************************/

    parseItemField_period(e) {
        if (typeof(e.unix) === "function") {
            return e.unix()
        }
        return 0;
    }

    /**********************************
     * Item fields validation methods *
     **********************************/

    validate_company(value) {
        if (!this.cleanStringField(value)) return t("Организация не указана");
        return "";
    }

    validate_date(value) {
        if (!this.cleanStringField(value)) return t("Не указана дата отчета");
        if (this.cleanIntField(value)===null) return t("Указана некорректная дата отчета");
        return "";
    }

    validate_period(value) {
        if (!this.cleanStringField(value)) return t("Не указан период отчета");
        if (this.cleanIntField(value)===null) return t("Указан некорректный период отчета");
        return "";
    }

    validate_type(value) {
        if (!this.cleanStringField(value)) return t("Не указан тип отчета");
        if (!this.findReportById(value)) return t("Указан некорректный тип отчета");
        return "";
    }


    /***************************************************
     * Item field values cleanup and transform methods *
     * used to prepare fields to be pushed to database *
     ***************************************************/

    cleanField_company(value) {
        return this.cleanStringField(value);
    }


    cleanField_date(value) {
        return this.cleanIntField(value);
    }

    cleanField_period(value) {
        return this.cleanIntField(value);
    }

    cleanField_type(value) {
        if (this.validate_type(value)) return null;
        return this.cleanStringField(value);
    }

    /**
     * Methods used to render presentations of field values
     * in list view
     * @param value: Source value
     * @returns formatted value
     */
    renderListField_period(value) {
        if (!this.validate_date(value)) {
            return moment(value*1000).format("YYYY "+t("г."));
        } else {
            return 0;
        }
    }

    renderListField_type(value) {
        var report_type = this.findReportById(value);
        if (report_type) return report_type.text;
        return "";
    }

    /**
     * Method returns report type record (with id and name) by report_type ID
     * @param report_id: ID of report type
     * @returns {object} Record with information about report type
     */
    findReportById(report_id) {
        const props = this.getProps();
        const report_types = props.report_types;
        for (var i in report_types) {
            if (report_types[i].id === report_id) {
                return report_types[i]
            }
        }
        return null;
    }

    /**
     * Method called when user presses "Сформировать" or "Загрузить PDF" buttons. Used to generate
     * report in specified format
     * @param format: Format of report: "html" or "pdf"
     */
    generateReport(format) {
        Store.store.dispatch(actions.changeProperty("errors",{}));
        var errors = this.validate();
        if (errors !== null) {
            Store.store.dispatch(actions.changeProperty("errors",errors));
            return;
        }
        var props = this.getProps();
        const item = props["item"];
        var url = "http://"+backendConfig.host+":"+backendConfig.port+
            "/report/generate/"+item["company"].replace(/\#/,"").replace(/\:/g,"_")+"/"+item["type"]+"/"+item["period"]+"/"+format;
        var token = Backend.getAuthToken(null,null);
        if (token) url += '?token='+token;
        window.open(url);
    }

    /**
     * Method used to update "Report types" list in application state
     * @param callback: Function which called after opertation finished
     */
    loadReportTypes(callback) {
        Backend.request("/report/types",{},"GET",{},null, function(err,response) {
            if (!err && response) {
                response.json().then(function(report_types) {
                    var report_types_array = [];
                    for (var key in report_types) {
                        report_types_array.push({id:key,text:report_types[key]});
                    }
                    Store.store.dispatch(actions.changeProperty('report_types',report_types_array));
                    if (callback) {
                        callback();
                    }
                });
            } else {
                if (callback) {
                    callback();
                }
            }
        })
    }

    updateList(options={}) {
        super.updateList(options);
        this.loadReportTypes();
    }

    /**
     * Method called after standard "updateItem" action
     */
    updateItem(uid,callback) {
        var self = this;
        super.updateItem(uid,function() {
            Backend.getList('company',{}, function(err, response) {
                var companies_list = [];
                if (err || typeof(response) !== "object") {
                    Store.store.dispatch(actions.changeProperty('companies_list',companies_list));
                    if (callback) callback();
                    return;
                }
                companies_list = response.map(function(item) {
                    return {id:item['uid'],text:item["name"]};
                });
                Store.store.dispatch(actions.changeProperty('companies_list',companies_list));
                self.loadReportTypes(function() {
                    if (callback) callback();
                });
            })
        })
    }

    /**
     * Method used to send report in PDF format to specified email
     * @param callback: Function called after process finished
     */
    sendByEmail(callback) {
        const self = this;
        Store.store.dispatch(actions.changeProperty("errors",{}));
        var errors = {};
        errors = this.validate();
        if (errors !== null) {
            Store.store.dispatch(actions.changeProperty("errors",errors));
            if (callback) callback();
            return;
        }
        errors = {}
        Store.store.dispatch(actions.changeProperty("errors",{}));
        const props = this.getProps();
        const state = this.getState();
        const item = props.item;
        const stateItem = state.item;
        var email = "";
        email = prompt(t("Укажите e-mail адрес"));
        if (!email || !email.trim()) {
            if (callback) callback();
            return
        }
        Store.store.dispatch(actions.changeProperty('isUpdating',true));
        var url = "http://"+backendConfig.host+":"+backendConfig.port+
            "/report/generate/"+item["company"].replace(/\#/,"").replace(/\:/g,"_")+"/"+item["type"]+"/"+item["period"]+"/email";
        var token = Backend.getAuthToken(null,null);
        if (token) url += '?token='+token;
        url += "&email="+email;
        console.log(url);
        Backend.request(url,{},'GET',{},null, function(err,response) {
            Store.store.dispatch(actions.changeProperty('isUpdating',false));
            if (err) {
                Store.store.dispatch(actions.changeProperty('errors',{'general': t("Системная ошибка")}));
                return;
            }
            response.text().then(function(text) {
                if (text && text.length) {
                    Store.store.dispatch(actions.changeProperty('errors',{'general':text}));
                    if (callback) callback();
                    return;
                } else {
                    Store.store.dispatch(actions.changeProperty("itemSaveSuccessText", t("Операция успешно завершена")));
                    setTimeout(function () {
                        Store.store.dispatch(actions.changeProperty("itemSaveSuccessText", ""));
                    }, 3000);
                    if (callback) callback();
                }
            }).catch(function() {
                if (callback) callback();
            })
        })
    }

    mapStateToProps(state,ownProps) {
        var result = super.mapStateToProps(state,ownProps);
        result["listColumns"] = {
            "date": {
                title: t("Дата создания")
            },
            "period": {
                title: t("Период отчета")
            },
            "type": {
                title: t("Тип отчета")
            },
            "company": {
                title: t("Организация")
            }
        }
        if (!result["sortOrder"] || !result["sortOrder"].field) {
            result["sortOrder"] = {field:'date',direction:'ASC'}
        }
        result["companies_list"] = state["companies_list"] ? state["companies_list"] : [];
        result["report_types"] = state["report_types"] ? state["report_types"] : [];
        return result;
    }

    mapDispatchToProps(dispatch,ownProps) {
        var self = this;
        var result = super.mapDispatchToProps(dispatch,ownProps);
        result["findReportById"] = (report_id) => {
            return self.findReportById(report_id);
        }
        result["generateReport"] = (format="html") => {
            self.generateReport(format);
        };
        result["sendByEmail"] = () => self.sendByEmail();
        return result;
    }
}

var report = new ReportContainer();
var Report = connect(report.mapStateToProps.bind(report),report.mapDispatchToProps.bind(report))(ReportComponent);
export {Report};
export default ReportContainer;