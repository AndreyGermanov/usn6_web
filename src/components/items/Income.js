import React from 'react';
import Document from './Document';
import t from '../../utils/translate/translate';
import {Input,Select,DateTime,Button} from '../ui/Form';

/**
 * Component used to manage "Income" page (both list and item views)
 */
class Income extends Document {

    /**
     * Method used to render detail view
     */
    renderForm(item,labels) {
        return [
            <div className="form-group" key="f1">
                <Select name="company" value={item["company"]} label={labels["company"]}
                        items={this.props.companies_list}/>
            </div>,
            <div className="form-group" key="f2">
                <Input name="number" value={item["number"]} label={labels["number"]} containerClass="col-sm-4"/>
                <DateTime name="date" value={item["date"]} label={labels["date"]} containerClass="col-sm-4"/>
            </div>,
            <div className="form-group" key="f3">
                <Input name="description" value={item["description"]} label={labels["description"]} multiline={true}/>
            </div>,
            <div className="form-group" key="f4">
                <Input name="amount" value={item["amount"]} label={labels["amount"]}/>
            </div>,
            <div className="form-group" align="center" key="f5">
                <Button onPress={() => this.props.saveToBackend()} text={t("Сохранить")}
                        iconClass="glyphicon glyphicon-ok"/>
            </div>
        ]
    }
}

export default Income;