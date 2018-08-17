import Entity from './Entity';
import {Panel} from 'react-bootstrap';
import React from "react";
import t from '../utils/translate/translate';
import 'jquery'
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';


/**
 * Component used to manage "Accounts" page (both list and item views)
 */
class Account extends Entity {
    /**
     * Method initializes all properties of item
     * @returns Initialized item
     */
    initItem() {
        var item = this.props.item;
        if (!item.bank_name) item.bank_name = '';
        if (!item.company) item.company = '';
        if (!item.number) item.number = '';
        if (!item.bik) item.bik = '';
        if (!item.ks) item.ks = '';
        return item;
    }

    /**
     * Method used to render detail view
     */
    renderItem() {
        if (!this.props.item) return null;
        var item = this.initItem();
        var errors = this.props.errors;
        return (
            <div>
                {this.renderItemActionButtons()}
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">
                            {this.props.itemTitle} {item['number']} {t("в")} {item['bank_name']}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {errors["general"] ?
                            <div className="alert alert-danger">
                                {errors["general"]}
                            </div>
                            : ""}
                        {this.props.itemSaveSuccessText ?
                            <div className="alert alert-success">
                                {this.props.itemSaveSuccessText}
                            </div>
                            : ""}
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="control-label col-sm-2">
                                    {t("Организация")}
                                </label>
                                <div className="col-sm-10">
                                    <Select2 value={item["company"]} className="form-control"
                                             data={this.props.companies_list}
                                             onSelect={this.props.changeItemField.bind(this,"company")}/>

                                    <span className="error">{errors["company"]}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">
                                    {t("Банк")}
                                </label>
                                <div className="col-sm-4">
                                    <input className="form-control" value={item["bank_name"]}
                                           onChange={this.props.changeItemField.bind(this,"bank_name")}/>
                                    <span className="error">{errors["bank_name"]}</span>
                                </div>
                                <div>
                                    <label className="control-label col-sm-2">
                                        {t("БИК")}
                                    </label>
                                    <div className="col-sm-4">
                                        <input className="form-control" value={item["bik"]}
                                               onChange={this.props.changeItemField.bind(this,"bik")}/>
                                        <span className="error">{errors["bik"]}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">
                                    {t("Номер счета")}
                                </label>
                                <div className="col-sm-4">
                                    <input className="form-control" value={item["number"]}
                                           onChange={this.props.changeItemField.bind(this,"number")}/>
                                    <span className="error">{errors["number"]}</span>
                                </div>
                                <div>
                                    <label className="control-label col-sm-2">
                                        {t("Корр.счет")}
                                    </label>
                                    <div className="col-sm-4">
                                        <input className="form-control" value={item["ks"]}
                                               onChange={this.props.changeItemField.bind(this,"ks")}/>
                                        <span className="error">{errors["ks"]}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" align="center">
                                <a className="btn btn-primary" style={{cursor:'pointer'}}
                                   onClick={() => this.props.saveToBackend()}>
                                    <i className="glyphicon glyphicon-ok"/>&nbsp;{t("Сохранить")}
                                </a>
                            </div>
                        </form>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

export default Account;