import React,{Component} from "react";
import {Panel} from "react-bootstrap";
import t from '../../utils/translate/translate';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import Form from '../ui/Form';
import {Header} from '../../containers/Header';
library.add(faStroopwafel);

/**
 * Base class used to represent data model either as list view or detail view
 * All concrete views extends from it
 */
class Entity extends Component {

    /**
     * Method starts after component rendered and displayed on the screen
     */
    componentDidMount() {
        this.props.updateItem(this.props.uid);
    }

    /**
     * Main method used to render this view
     * @returns Array of Rendered components
     */
    render() {
        if (!this.props.item) return null;
        const item = this.props.initItem(this.props.item);
        const labels = this.props.getFieldLabels();
        const errors = this.props.errors;
        return [
            <Header key="f1"/>,
            <div key="f2">
                {this.renderItemActionButtons()}
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">
                            {this.props.getItemTitle(item)}
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
                        <Form ownerProps={this.props}>
                            {this.renderForm(item,labels,errors)}
                        </Form>
                    </Panel.Body>
                </Panel>
            </div>
        ]
    }

    /**
     * Method renders buttons above detail view form
     * @returns Rendered set of buttons
     */
    renderItemActionButtons() {
        const result = [];
        result.push(<a key="back_btn" className="btn btn-primary list-nav"
                       href={'#'+this.props.model.collectionName}>
            <i className="glyphicon glyphicon-arrow-left"/>&nbsp;{t("Назад")}
        </a>);
        return <div style={{paddingBottom:'10px'}}>{result}</div>;
    }

    /**
     * Method used to render contents of form in detail view
     * @param item: Entity to display in the form
     * @param labels: Object of labels for items
     * @param errors: Object of errors
     * @returns array of rendered components
     */
    renderForm(item,labels,errors) {
        return []
    }
}

export default Entity;