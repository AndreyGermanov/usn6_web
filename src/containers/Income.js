import {connect} from "react-redux";
import IncomeComponent from '../components/Income'
import DocumentContainer from './Document'
import t from '../utils/translate/translate'
import actions from "../actions/Actions";
import Backend from "../backend/Backend";
import Store from "../store/Store";
import moment from "moment-timezone";

/**
 * Controller class for Income component. Contains all methods and properties, which used by this module.
 */
class IncomeContainer extends DocumentContainer {

    constructor() {
        super();
        this.model = "income";
        this.listTitle = t("Список операций прихода");
        this.itemTitle = t("Приход");
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
        if (this.cleanDecimalField(value)===null) return t("Указан некорректный номер документа");
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
                if (callback) callback();
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
            "amount": {
                title: t("Сумма")
            },
            "company": {
                title: t("Организация")
            }
        };
        if (!result["sortOrder"] || !result["sortOrder"].field) {
            result["sortOrder"] = {field:'date',direction:'ASC'}
        }
        result["companies_list"] = state["companies_list"] ? state["companies_list"] : [];
        return result;
    }
}

var income = new IncomeContainer();
var Income = connect(income.mapStateToProps.bind(income),income.mapDispatchToProps.bind(income))(IncomeComponent);
export {Income};
export default IncomeContainer;