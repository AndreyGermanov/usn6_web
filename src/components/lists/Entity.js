import React,{Component} from "react";
import {Panel} from "react-bootstrap";
import t from '../../utils/translate/translate';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
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
        this.props.updateList();
    }

    /**
     * Main method used to render this view
     * @returns Rendered component
     */
    render() {
        return [
            <Header/>,
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        {this.props.listTitle}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {this.renderListActionButtons()}
                    <table className="table table-bordered table-striped">
                        <tbody>
                        <tr>
                            {this.renderHeaderRow()}
                        </tr>
                        {this.renderListRows()}
                        </tbody>
                    </table>
                    {this.renderFooterNavigation()}
                </Panel.Body>
            </Panel>
        ]
    }

    /**
     * Method used to render header columns of List view table
     * @returns Array of rendered columns
     */
    renderHeaderRow() {
        const result = [
            <td key="header_column_checkbox">
                <div align="center">
                    <input type="checkbox" checked={this.props.isAllItemsChecked()}
                           onChange={this.props.selectAllItems.bind(this)}/>
                </div>
            </td>
        ];

        for (let field in this.props.listColumns) {
            let sortOrderWidget = null;
            if (this.props.sortOrder.field === field) {
                let arrowClass = "";
                if (this.props.sortOrder.direction === "ASC") arrowClass = "glyphicon-arrow-down";
                if (this.props.sortOrder.direction === "DESC") arrowClass = "glyphicon-arrow-up";
                sortOrderWidget = <i className={arrowClass+" glyphicon pull-right"}/>
            }
            result.push(<th key={"header_column_"+field} style={{cursor:'pointer'}}
                            onClick={this.props.changeListSortOrder.bind(this,field)}>
                {this.props.listColumns[field].title}{sortOrderWidget}
                </th>);
        }

        return result
    }

    /**
     * Method used to render management buttons for list view
     * @returns Rendered components with buttons
     */
    renderListActionButtons() {
        this.listActionButtons = [
            <a key="add_btn" className="btn btn-success list-nav" href={"#/"+this.props.model.itemName+"/new"}>
                <i className="glyphicon glyphicon-plus"/>&nbsp;{t("Новый")}
            </a>,
            <a key="refreshBtn" className="btn btn-info list-nav" style={{"cursor":"pointer"}}
                onClick={() => this.props.updateList({})}>
                <i className="glyphicon glyphicon-refresh"/>&nbsp;{t("Обновить")}
            </a>
        ];
        if (this.props.selectedItems && this.props.selectedItems.length>0) {
            const deleteBtn =
                <a key="deleteBtn" className="btn btn-danger list-nav" style={{"cursor":"pointer"}}
                    onClick={() => this.props.deleteItems()}>
                    <i className="glyphicon glyphicon-remove"/>&nbsp;{t("Удалить")}
                </a>;
            this.listActionButtons.push(deleteBtn);
        }
        return (
            <div style={{paddingBottom:'7px'}}>
                {this.listActionButtons}
                <span className="pull-right">
                    <input className="form-control" style={{width:'220px'}} placeholder="Search ..."
                    onChange={this.props.changeListFilter.bind(this)}/>
                </span>
            </div>
        )
    }

    /**
     * Method used to render individual row in table of List view
     * @param item: Data item for which need to render row
     * @returns Rendered row
     */
    renderListRow(item) {
        const columns = [
            <td key={"list_"+item.uid+"_uid"}>
                <div align="center">
                    <input type="checkbox" onChange={this.props.selectItem.bind(this,item.uid)}
                           checked={this.props.isItemChecked(item.uid)}/>
                </div>
            </td>
        ];
        for (let field in this.props.listColumns) {
            if (typeof(item[field]) !== "undefined") {
                columns.push(
                    <td key={"list_"+item.uid+"_"+field}>
                        <a href={"#"+this.props.model.itemName+"/"+item.uid.replace(/#/g,"").replace(/:/g,"_")}>
                            {this.props.renderListField(field,item[field])}
                        </a>
                    </td>
                );
            } else {
                columns.push(<td key={"list_"+item.uid+"_"+field}>&nbsp;</td>);
            }
        }
        return <tr key={"list_"+item.uid}>{columns}</tr>;
    }

    /**
     * Method used to render list of items in List view
     * @returns Rendered array of table rows
     */
    renderListRows() {
        const self = this;
        return this.props.list.map(function(item) {
            return self.renderListRow(item);
        }, this);
    }

    /**
     * Method renders footer of List view form (pages navigation)
     * @returns {*} Rendered component
     */
    renderFooterNavigation() {
        let leftButton = null;
        let rightButton = null;
        let pageSelector = null;
        const numPages = Math.ceil(this.props.numberOfItems/this.props.itemsPerPage);
        if (this.props.pageNumber>1) {
            leftButton =
                <a className="btn btn-primary"
                   onClick={this.props.changeListPage.bind(this,this.props.pageNumber-1)}>
                    <i className="glyphicon glyphicon-arrow-left"/>
                </a>
        }
        if (numPages>1 && this.props.pageNumber<numPages) {
            rightButton =
                <a className="btn btn-primary"
                   onClick={this.props.changeListPage.bind(this,this.props.pageNumber+1)}>
                    <i className="glyphicon glyphicon-arrow-right"/>
                </a>
        }
        if (numPages>1) {
            const pages = [];
            for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                pages.push(<option key={"page_select_" + pageNumber} value={pageNumber}>{pageNumber}</option>)
            }
            pageSelector =
                <select value={this.props.pageNumber} className="form-control"
                        onChange={(elem) => {
                            this.props.changeListPage(elem.target.value)
                        }}>
                    {pages}
                </select>
        }
        return (
            <div align="center">
                <table>
                    <tbody>
                    <tr>
                        <td className="padding-nav">{leftButton}</td>
                        <td className="padding-nav">{pageSelector}</td>
                        <td>{rightButton}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Entity;