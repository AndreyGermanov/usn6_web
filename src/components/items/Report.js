import React from 'react';
import Entity from './Entity';
import t from "../../utils/translate/translate";
import {Input,Select,DateTime,Button} from '../ui/Form';
/**
 * Component used to manage "Reports" page (both list and item views)
 */
class Report extends Entity {

    /**
     * Method used to render detail view
     */
    renderForm(item,labels,errors) {
        return [
            <div className="form-group">
                <Select name="company" value={item["company"]} label={labels["company"]}
                        items={this.props.companies_list}/>
            </div>,
            <div className="form-group">
                <Select name="type" value={item["type"]} label={labels["type"]} items={this.props.report_types}/>
            </div>,
            <div className="form-group">
                <DateTime name="date" value={item["date"]} label={labels["date"]} containerClass="col-sm-4"/>
                <DateTime name="period" value={item["period"]} label={labels["period"]} containerClass="col-sm-4"
                          mode="years" dateFormat="YYYY" timeFormat={false}/>
            </div>,
            <div className="form-group">
                <Input name="email" value={item["email"]} label={labels["email"]}/>
            </div>,
            <div className="form-group pull-left" style={{paddingLeft:'15px'}}>
                <Button text={t("Сформировать")} className="btn btn-success" iconClass="glyphicon glyphicon-repeat"
                    onPress={() => this.props.generateReport("html")}/>&nbsp;
                <Button text={t("Загрузить PDF")} className="btn btn-warning"
                        iconClass="glyphicon glyphicon-download-alt" onPress={() => this.props.generateReport("pdf")}/>&nbsp;
                <Button text={t("Отправить на Email")} className="btn btn-warning"
                        iconClass="glyphicon glyphicon-envelope" onPress={() => this.props.sendByEmail()}/>
            </div>,
            <div className="form-group pull-right" style={{paddingRight:'15px'}}>
                <Button onPress={() => this.props.saveToBackend()} text={t("Сохранить")}
                        iconClass="glyphicon glyphicon-ok"/>
            </div>
        ]
    }
}

Object.assign(Report, Entity);
export default Report;