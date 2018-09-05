import React from 'react';
import Entity from './Entity';
import t from "../../utils/translate/translate";
import Form,{DateTime,Input,Button} from '../ui/Form';

/**
 * Base component to manage Documents (both list and item views). All documents inherits from it
 */
class Document extends Entity {

    /**
     * Method used to render management buttons for list view
     * @returns Rendered components with buttons
     */
    renderListActionButtons() {
        this.listActionButtons = [
            <Button className="btn btn-success list-nav"
                    onPress={() => window.location.href="#/"+this.props.model.itemName+"/new"}
                    iconClass="glyphicon glyphicon-plus" text={t("Новый")}/>,
            <Button className="btn btn-info list-nav" onPress={() => this.props.updateList()}
                iconClass="glyphicon glyphicon-refresh" text={t("Обновить")}/>
        ];
        if (this.props.selectedItems && this.props.selectedItems.length>0) {
            const deleteBtn =
                <a key="deleteBtn" className="btn btn-danger list-nav" style={{"cursor":"pointer"}}
                   onClick={this.props.deleteItems.bind(this)}>
                    <i className="glyphicon glyphicon-remove"/>&nbsp;{t("Удалить")}
                </a>;
            this.listActionButtons.push(deleteBtn);
        }
        return (
            <div style={{paddingBottom:'7px'}}>
                {this.listActionButtons}
                <span className="pull-right">
                    <Form ownerProps={this.props}>
                        <div className="form-group">
                            <label className="control-label col-sm-2">{t("Период")}</label>
                            <DateTime name="periodStart" value={this.props.periodStart} dateFormat="DD.MM.YYYY"
                                      timeFormat={false} onChange={this.props.changePeriodField}
                                      containerClass="col-sm-3"/>
                            <DateTime name="periodEnd" value={this.props.periodEnd} dateFormat="DD.MM.YYYY"
                                      timeFormat={false} onChange={this.props.changePeriodField}
                                      containerClass="col-sm-3"/>
                            <Input name="search" onChange={this.props.changeListFilter}
                                   placeholder={t("Поиск")+" ..."} inputStyle={{width:'220px'}}
                                    containerClass="col-sm-3"/>
                        </div>
                    </Form>
                </span>
            </div>
        )
    }
}

export default Document;