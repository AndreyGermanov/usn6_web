import React from 'react';
import {Panel} from 'react-bootstrap';
import Document from './Document';
import t from '../utils/translate/translate';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'
import 'jquery'
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import moment from 'moment-timezone'


/**
 * Component used to manage "Income" page (both list and item views)
 */
class Income extends Document {
    /**
     * Method initializes all properties of item
     * @returns Initialized item
     */
    initItem() {
        var item = this.props.item;
        if (!item.description) item.description = '';
        if (!item.company) item.company = '';
        if (!item.number) item.number = '';
        if (!item.date) item.date = moment().unix();
        if (!item.amount) item.amount = '';
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
                            {this.props.itemTitle} № {
                            item['number']} {item["date"] ?
                                t("от")+" "+moment(parseInt(item["date"])*1000).format("DD.MM.YYYY HH:mm:ss")
                            :
                                ""}
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
                                    {t("Номер")}
                                </label>
                                <div className="col-sm-4">
                                    <input className="form-control" value={item["number"]}
                                           onChange={this.props.changeItemField.bind(this,"number")}/>
                                    <span className="error">{errors["number"]}</span>
                                </div>
                                <div>
                                    <label className="control-label col-sm-2">
                                        {t("Дата")}
                                    </label>
                                    <div className="col-sm-4">
                                        <DateTime value={moment(item["date"]*1000)}
                                                  onChange={this.props.changeItemField.bind(this,"date")}
                                                  dateFormat="DD.MM.YYYY"
                                                  timeFormat="HH:mm:ss"
                                        />
                                        <span className="error">{errors["date"]}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">
                                    {t("Описание операции")}
                                </label>
                                <div className="col-sm-10">

                                   <textarea className="form-control" value={item["description"]}
                                             onChange={this.props.changeItemField.bind(this,"description")}/>
                                    <span className="error">{errors["description"]}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">
                                    {t("Сумма")}
                                </label>
                                <div className="col-sm-10">
                                   <input className="form-control" value={item["amount"]}
                                             onChange={this.props.changeItemField.bind(this,"amount")}/>
                                    <span className="error">{errors["amount"]}</span>
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

export default Income;