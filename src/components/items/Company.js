import Entity from './Entity'
import React from "react";
import t from '../../utils/translate/translate';
import {Input,Select,Button} from '../ui/Form';

/**
 * Component used to manage "Companies" page (both list and item views)
 */
class Company extends Entity {

    /**
     * Method used to render detail view
     */
    renderForm(item,labels,errors) {
        return [
            <div className="form-group">
                <Input name="name" value={item["name"]} label={labels["name"]}/>
            </div>,
            <div className="form-group">
                <Select name="type" value={item["type"]} label={labels["type"]} items={Company.getTypesList()}/>
            </div>,
            <div className="form-group">
                <Input name="inn" value={item["inn"]} label={labels["inn"]} containerClass="col-sm-4"/>
                {parseInt(item["type"],10) !== 1 ?
                    <Input name="kpp" value={item["kpp"]} label={labels["kpp"]} containerClass="col-sm-4"/>
                    : null
                }
            </div>,
            <div className="form-group">
                <Input name="address" value={item["address"]} label={labels["address"]} multiline={true}/>
            </div>,
            <div className="form-group" align="center">
                <Button onPress={() => this.props.saveToBackend()} text={t("Сохранить")}
                        iconClass="glyphicon glyphicon-ok"/>
            </div>
        ]
    }

    /**
     * Method returns list of options for "Тип" dropdown
     */
    static getTypesList() {
        return [
            {text:t("Индивидуальный предприниматель"),id:1},
            {text:t("Общество с ограниченной ответственностью"),id:2}
        ]
    }
}

export default Company;