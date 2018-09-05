import React from 'react';
import Document from './Document';
import t from '../../utils/translate/translate';
import {Input,Select,DateTime,Button} from '../ui/Form';
/**
 * Component used to manage "Spendings" page (both list and item views)
 */
class Spending extends Document {

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
                <Select name="type" value={item["type"]} label={labels["type"]} items={this.props.spending_types}/>
            </div>,
            <div className="form-group">
                <Input name="number" value={item["number"]} label={labels["number"]} containerClass="col-sm-2"/>
                <DateTime name="date" value={item["date"]} label={labels["date"]} containerClass="col-sm-3"
                          labelClass="col-sm-1"/>
                <Input name="period" value={item["period"]} label={labels["period"]} containerClass="col-sm-2"/>
            </div>,
            <div className="form-group">
                <Input name="description" value={item["description"]} label={labels["description"]} multiline={true}/>
            </div>,
            <div className="form-group">
                <Input name="amount" value={item["amount"]} label={labels["amount"]}/>
            </div>,
            <div className="form-group" align="center">
                <Button onPress={() => this.props.saveToBackend()} text={t("Сохранить")}
                        iconClass="glyphicon glyphicon-ok"/>
            </div>
        ]
    }
}

export default Spending;