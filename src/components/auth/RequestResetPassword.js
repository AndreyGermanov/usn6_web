import React, { Component } from 'react';
import t from "../../utils/translate/translate";
import {Panel} from 'react-bootstrap';
import Form,{Input,Button} from '../ui/Form';
import Entity from '../items/Entity';

class RequestResetPassword extends Entity {

    /**
     * Method used to render component
     * @returns {*} Rendered component
     */
    render() {
        if (!this.props.item) return null;
        const item = this.props.initItem(this.props.item);
        const labels = this.props.getFieldLabels();
        return (
            <Panel bsStyle="primary" className="col-sm-6 screen-center">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        {t("Форма отправки ссылки на сброс пароля")}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {this.renderStatusMessage()}
                    <Form ownerProps={this.props}>
                        {!this.props.resetPasswordEmailSent ? this.renderForm(item,labels) : this.renderSuccessMessage()}
                    </Form>
                </Panel.Body>
            </Panel>
        )
    }

    /**
     * Method used to render contents of form in detail view
     * @param item: Entity to display in the form
     * @param labels: Object of labels for items
     * @returns array of rendered components
     */
    renderForm(item,labels) {
        return [
            <div className="form-group" key="f4">
                <Input name="email" value={item["email"]} label={labels["email"]}/>
            </div>,
            <div className="form-group" align="center"  key="f5">
                <Button onPress={() => this.props.saveToBackend()} iconClass="glyphicon glyphicon-ok"
                        text={t("Отправить")}/>
            </div>
        ]
    }

    /**
     * Method used to render message, which is displayed on the screen after successful submit of the form
     * @returns {*}
     */
    renderSuccessMessage() {
        return <div align="center">
            {t("Ссылка на форму ввода нового пароля отправлена по указанному email-адресу")}
        </div>
    }
}

export default RequestResetPassword;