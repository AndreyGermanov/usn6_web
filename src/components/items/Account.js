import Entity from './Entity';
import React from "react";
import t from '../../utils/translate/translate';
import {Input,Select,Button} from '../ui/Form';

/**
 * Component used to manage "Accounts" page (both list and item views)
 */
class Account extends Entity {

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
                <Input name="bank_name" value={item["bank_name"]} label={labels["bank_name"]}
                    containerClass="col-sm-4"/>
                <Input name="bik" value={item["bik"]} label={labels["bik"]} containerClass="col-sm-4"/>
            </div>,
            <div className="form-group" key="f3">
                <Input name="number" value={item["number"]} label={labels["number"]} containerClass="col-sm-4"/>
                <Input name="ks" value={item["ks"]} label={labels["ks"]} containerClass="col-sm-4"/>
            </div>,
            <div className="form-group" align="center"  key="f4">
                <Button onPress={() => this.props.saveToBackend()} iconClass="glyphicon glyphicon-ok"
                        text={t("Сохранить")}/>
            </div>
        ]
    }
}

export default Account;