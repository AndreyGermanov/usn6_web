import Entity from './Entity'
import {Panel} from 'react-bootstrap';
import React from "react";
import t from '../utils/translate/translate';
import 'jquery'
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

/**
 * Component used to manage "Companies" page (both list and item views)
 */
class Company extends Entity {

    /**
     * Method initializes all properties of item
     * @returns Initialized item
     */
    initItem() {
        var item = this.props.item;
        if (!item.name) item.name = '';
        if (!item.inn) item.inn = '';
        if (!item.kpp) item.kpp = '';
        if (!item.address) item.address = '';
        if (!item.type) item.type = 1;
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
                            {this.props.itemTitle} {item['name']}
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
                                    {t("Наименование")}
                                </label>
                                <div className="col-sm-10">
                                    <input className="form-control" value={item["name"]}
                                           onChange={this.props.changeItemField.bind(this,"name")}/>
                                    <span className="error">{errors["name"]}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">
                                    {t("Тип")}
                                </label>
                                <div className="col-sm-10">
                                    <Select2 value={item["type"]} className="form-control"
                                             data={[
                                                 {id:1,text:t("Индивидуальный предприниматель")},
                                                {id:2,text:t("Общество с органиченной ответственностью")}
                                             ]}
                                           onChange={this.props.changeItemField.bind(this,"type")}/>
                                    <span className="error">{errors["type"]}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">
                                    {t("ИНН")}
                                </label>
                                <div className="col-sm-4">
                                    <input className="form-control" value={item["inn"]}
                                           onChange={this.props.changeItemField.bind(this,"inn")}/>
                                    <span className="error">{errors["inn"]}</span>
                                </div>
                                {item["type"] != 1 ?
                                <div>
                                <label className="control-label col-sm-2">
                                    {t("КПП")}
                                </label>
                                <div className="col-sm-4">
                                    <input className="form-control" value={item["kpp"]}
                                           onChange={this.props.changeItemField.bind(this,"kpp")}/>
                                    <span className="error">{errors["kpp"]}</span>
                                </div>
                                </div>
                                : null }
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">
                                    {t("Адрес")}
                                </label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" value={item["address"]}
                                              onChange={this.props.changeItemField.bind(this,"address")}/>
                                    <span className="error">{errors["address"]}</span>
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

export default Company;