import React from 'react';
import Entity from './Entity';
import moment from "moment-timezone";
import t from "../utils/translate/translate";
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'
import 'jquery'
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import {Panel} from 'react-bootstrap';


/**
 * Component used to manage "Reports" page (both list and item views)
 */
class Report extends Entity {
    /**
     * Method initializes all properties of item
     * @returns Initialized item
     */
    initItem() {
        var item = this.props.item;
        if (!item.company) item.company = '';
        if (!item.date) item.date = moment().unix();
        if (!item.period) item.period = moment().unix();
        if (!item.type) item.type = 'kudir';
        return item;
    }

    /**
     * Method used to render detail view
     */
    renderItem() {
        if (!this.props.item) return null;
        var item = this.initItem();
        var errors = this.props.errors;
        var self = this;
        return (
            <div>
                {this.renderItemActionButtons()}
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">
                            {this.props.itemTitle}: {self.props.findReportById(item["type"]) ?
                            this.props.findReportById(item["type"]).text+" "+t("за")+" "+
                            moment(parseInt(item["date"])*1000).format("YYYY "+t("г.")) : ""}
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
                        <form className="form-horizontal" style={{paddingLeft:"10px",paddingRight:"10px"}}>
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
                                    {t("Тип отчета")}
                                </label>
                                <div className="col-sm-10">
                                    <Select2 value={item["type"]} className="form-control"
                                             data={this.props.report_types}
                                             onSelect={this.props.changeItemField.bind(this,"type")}/>
                                    <span className="error">{errors["type"]}</span>
                                </div>
                            </div>
                            <div className="form-group">
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
                                <label className="control-label col-sm-2">
                                    {t("Период расхода")}
                                </label>
                                <div className="col-sm-4">
                                    <DateTime value={moment(item["period"]*1000)}
                                              onChange={this.props.changeItemField.bind(this,"period")}
                                              dateFormat="YYYY"
                                              timeFormat={false}
                                    />
                                    <span className="error">{errors["period"]}</span>
                                </div>
                            </div>
                            <div className="form-group pull-left">
                                <a className="btn btn-success" style={{cursor:'pointer'}}
                                   onClick={() => this.props.generateReport("html")}>
                                    <i className="glyphicon glyphicon-repeat"/>&nbsp;{t("Сформировать")}
                                </a>&nbsp;
                                <a className="btn btn-warning" style={{cursor:'pointer'}}
                                   onClick={() => {this.props.generateReport("pdf")}}>
                                    <i className="glyphicon glyphicon-download-alt"/>&nbsp;{t("Загрузить PDF")}
                                </a>&nbsp;
                                <a className="btn btn-warning" style={{cursor:'pointer'}}
                                   onClick={() => this.props.sendByEmail()}>
                                    <i className="glyphicon glyphicon-envelope"/>&nbsp;{t("Отправить на Email")}
                                </a>

                            </div>
                            <div className="form-group pull-right">
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

Object.assign(Report, Entity);
export default Report;