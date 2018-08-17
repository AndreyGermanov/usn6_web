import {connect} from "react-redux";
import SpendingComponent from '../components/Spending'
import DocumentContainer from './Document'
import t from '../utils/translate/translate'
import actions from "../actions/Actions";
import moment from "moment-timezone";
import Backend from "../backend/Backend";
import Store from "../store/Store";

/**
 * Controller class for Spending component. Contains all methods and properties, which used by this module.
 */
class SpendingContainer extends DocumentContainer {

    constructor() {
        super();
        this.model = "spending";
        this.listTitle = t("Список операций расхода");
        this.itemTitle = t("Расход");
    }

    /**********************************
     * Item fields validation methods *
     **********************************/

    validate_description(value) {
        if (!this.cleanStringField(value)) return t("Описание операции не указано");
        return "";
    }

    validate_company(value) {
        if (!this.cleanStringField(value)) return t("Организация не указана");
        return "";
    }

    validate_number(value) {
        if (!this.cleanStringField(value)) return t("Номер документа не указан");
        if (this.cleanIntField(value)===null) return t("Указан некорректный номер документа");
        return "";
    }

    validate_amount(value) {
        if (!this.cleanStringField(value)) return t("Сумма не указана");
        if (this.cleanDecimalField(value)===null) return t("Указана некорректная сумма");
        return "";
    }

    validate_date(value) {
        if (!this.cleanStringField(value)) return t("Не указана дата документа");
        if (this.cleanIntField(value)===null) return t("Указана некорректная дата документа");
        return "";
    }

    validate_type(value) {
        if (!this.cleanStringField(value)) return t("Не указан тип расходов");
        var value = this.cleanDecimalField(value)
        if (value===null || value < 1 | value > 7 ) return t("Указан некорректный тип расходов");
        return "";
    }

    validate_period(value) {
        if (!this.cleanStringField(value)) return t("Период расходов не указан");
        return "";
    }

    /***************************************************
     * Item field values cleanup and transform methods *
     * used to prepare fields to be pushed to database *
     ***************************************************/

    cleanField_description(value) {
        return this.cleanStringField(value);
    }

    cleanField_company(value) {
        return this.cleanStringField(value);
    }


    cleanField_number(value) {
        return this.cleanDecimalField(value);
    }

    cleanField_amount(value) {
        return this.cleanDecimalField(value);
    }

    cleanField_date(value) {
        return this.cleanIntField(value);
    }

    cleanField_type(value) {
        return this.cleanIntField(value);
    }

    cleanField_period(value) {
        return this.cleanStringField(value);
    }

    /**
     * Method called after standard "updateItem" action
     */
    updateItem(uid,callback) {
        super.updateItem(uid, function() {
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
                Backend.request("/spending/types",{},"GET",{},null, function(err,response) {
                    if (!err && response) {
                        response.json().then(function(spending_types) {
                            var spending_types_array = [];
                            for (var key in spending_types) {
                                spending_types_array.push({id:key,text:spending_types[key]});
                            }
                            Store.store.dispatch(actions.changeProperty('spending_types',spending_types_array));
                            if (callback) callback();
                        });
                    } else {
                        if (callback) callback();
                    }
                })
            })
        })
    }

    mapStateToProps(state,ownProps) {
        var result = super.mapStateToProps(state,ownProps);
        result["listColumns"] = {
            "number": {
                title: t("Номер")
            },
            "date": {
                title: t("Дата")
            },
            "description": {
                title: t("Описание")
            },
            "period": {
                title: t("Период расхода")
            },
            "amount": {
                title: t("Сумма")
            },
            "company": {
                title: t("Организация")
            }
        }
        if (!result["sortOrder"] || !result["sortOrder"].field) {
            result["sortOrder"] = {field:'date',direction:'ASC'}
        }
        result["companies_list"] = state["companies_list"] ? state["companies_list"] : [];
        result["spending_types"] = state["spending_types"] ? state["spending_types"] : [];
        return result;
    }
}

var spending = new SpendingContainer();
var Spending = connect(spending.mapStateToProps.bind(spending),spending.mapDispatchToProps.bind(spending))(SpendingComponent);
export {Spending};
export default SpendingContainer;