import React, { Component } from 'react';
import t from "../utils/translate/translate";
import {Navbar,Nav,NavItem} from 'react-bootstrap'

/**
 * Class used to display main menu
 */
class Header extends Component {

    /**
     * Method used to render main navigation bar
     * @returns Rendered NavBar
     */
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">{t("Учет УСН 6%")}</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="/#incomes" style={this.props.setStyle('income')}>
                        {t("Доходы")}
                    </NavItem>
                    <NavItem eventKey={2} href="/#spendings" style={this.props.setStyle('spending')}>
                        {t("Расходы")}
                    </NavItem>
                    <NavItem eventKey={3} href="/#reports" style={this.props.setStyle('report')}>
                        {t("Отчеты")}
                    </NavItem>
                    <NavItem eventKey={4} href="/#companies" style={this.props.setStyle('company')}>
                        {t("Организации")}
                    </NavItem>
                    <NavItem eventKey={5} href="/#accounts" style={this.props.setStyle('account')}>
                        {t("Банковские счета")}
                    </NavItem>
                    <NavItem eventKey={6} onClick={() => this.props.logout()}>{t("Выход")}</NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Header;