import React,{Component} from "react";
import {Panel} from "react-bootstrap";
import {ScreenModes,Models} from "../reducers/RootReducer";
import t from '../utils/translate/translate';
import Store from '../store/Store';
import actions from '../actions/Actions';
import $ from 'jquery'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faStroopwafel)


/**
 * Base class used to represent data model either as list view or detail view
 * All concrete views extends from it
 */
class Entity extends Component {

    /**
     * Method used to update data of this form from backend (both for list view and for detail view)
     */
    fetchFromBackend() {
        if (this.props.screenMode === ScreenModes.LIST) {
            this.props.updateList();
        } else if (this.props.screenMode === ScreenModes.ITEM) {
            this.props.updateItem(this.props.uid);
        }
    }
    /**
     * Method starts after component rendered and displayed on the screen
     */
    componentDidMount() {
        this.fetchFromBackend();
        Store.store.dispatch(actions.changeProperty('screen',Models[this.props.model].screen));
    }

    /**
     * Method runs each time when component updated after application state update
     * @param prevProps: Previous props of object
     */
    componentDidUpdate(prevProps) {
        if (prevProps.screenMode !== this.props.screenMode) {
            this.fetchFromBackend();
        }
    }

    /**
     * Main method used to render this view
     * @returns Rendered component
     */
    render() {
        var result = null;
        if (this.props.screenMode === ScreenModes.ITEM) {
            result = this.renderItem();
        } else {
            result = this.renderList();
        }
        return (
            <div id={"content_div"} style={{opacity:this.props.isUpdating ? 0.3:1}}>
                {result}
            </div>
        )
    }

    /**
     * Method used to render header columns of List view table
     * @returns Rendered columns
     */
    renderHeaderRow() {
        var result = [
            <td key="header_column_checkbox">
                <div align="center">
                    <input type="checkbox" checked={this.props.isAllItemsChecked()}
                           onChange={this.props.selectAllItems.bind(this)}/>
                </div>
            </td>
        ];

        for (var field in this.props.listColumns) {
            var sortOrderWidget = null;
            if (this.props.sortOrder.field === field) {
                var arrowClass = "";
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
            <a key="add_btn" className="btn btn-success list-nav" href={"#/"+this.props.model+"/new"}>
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
     * Method renders buttons above detail view form
     * @returns Rendered set of buttons
     */
    renderItemActionButtons() {
        var result = [];
        result.push(<a key="back_btn" className="btn btn-primary list-nav"
                       href={'#'+Models[this.props.model].collection}>
            <i className="glyphicon glyphicon-arrow-left"/>&nbsp;{t("Назад")}
        </a>);
        return <div style={{paddingBottom:'10px'}}>{result}</div>;
    }

    /**
     * Method used to render individual row in table of List view
     * @param item: Data item for which need to render row
     * @returns Rendered row
     */
    renderListRow(item) {
        var columns = [
            <td key={"list_"+item.uid+"_uid"}>
                <div align="center">
                    <input type="checkbox" onChange={this.props.selectItem.bind(this,item.uid)}
                           checked={this.props.isItemChecked(item.uid)}/>
                </div>
            </td>
        ]
        for (var field in this.props.listColumns) {
            if (typeof(item[field]) !== "undefined") {
                columns.push(
                    <td key={"list_"+item.uid+"_"+field}>
                        <a href={"#"+this.props.model+"/"+item.uid.replace(/#/g,"").replace(/\:/g,"_")}>
                            {this.props.renderListField(field,item[field])}
                        </a>
                    </td>
                );
            } else {
                columns.push(<td key={"list_"+item.uid+"_"+field}></td>);
            }
        }
        return <tr key={"list_"+item.uid}>{columns}</tr>;
    }

    /**
     * Method used to render list of items in List view
     * @returns Rendered array of table rows
     */
    renderListRows() {
        const rows = this.props.list.map(function(item) {
            return this.renderListRow(item);
        }, this);
        return rows;
    }

    /**
     * Method renders footer of List view form (pages navigation)
     * @returns {*} Rendered component
     */
    renderFooterNavigation() {
        var leftButton = null;
        var rightButton = null;
        var pageSelector = null;
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
            var pages = [];
            for (var pageNumber = 1; pageNumber <= numPages; pageNumber++) {
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

    /**
     * Method used to render list view
     * @returns Rendered component
     */
    renderList() {
        return (
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
        )
    }

    /**
     * Method used to render detail view
     * @returns Rendered component
     */
    renderItem() {
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">{this.props.itemTitle}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                </Panel.Body>
            </Panel>
        )
    }
}

export default Entity;