import React from 'react';
import t from "../../utils/translate/translate";
import {Panel} from 'react-bootstrap';
import Form,{Input,Button} from '../ui/Form';
import Entity from '../items/Entity';

class Register extends Entity {

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
                        {t("Регистрация")}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {this.renderStatusMessage()}
                    <Form ownerProps={this.props}>
                        {!this.props.registerEmailSent ? this.renderForm(item,labels) : this.renderSuccessMessage()}
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
            <div className="form-group" key="f1">
                <Input name="name" value={item["name"]} label={labels["name"]}/>
            </div>,
            <div className="form-group" key="f2">
                <Input name="password" value={item["password"]} label={labels["password"]} password={true}/>
            </div>,
            <div className="form-group" key="f3">
                <Input name="confirm_password" value={item["confirm_password"]}
                       label={labels["confirm_password"]} password={true}/>
            </div>,
            <div className="form-group" key="f4">
                <Input name="email" value={item["email"]} label={labels["email"]}/>
            </div>,
            <div className="form-group" align="center"  key="f5">
                <Button onPress={() => this.props.saveToBackend()} iconClass="glyphicon glyphicon-ok"
                        text={t("Отправить")}/>
            </div>,
            <div className="form-group" align="center" key="f6">
                <a href="#/">{t("Вход в систему")}</a>
            </div>
        ]
    }

    /**
     * Method used to render message, which is displayed on the screen after successful submit of the form
     * @returns {*}
     */
    renderSuccessMessage() {
        return <div align="center">
            {t("Ссылка на активацию учетной записи была отправлена по указанному email адресу")}
            </div>
    }
}

export default Register;