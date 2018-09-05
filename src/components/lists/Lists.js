/**
 * Collection of Lists.
 */

import Entity from './Entity';
import Document from './Document';

class AccountList extends Entity {}

class CompanyList extends Entity {}

class ReportList extends Document {}

class IncomeList extends Document {}

class SpendingList extends Document {
}

export class Lists {
    static  Account = AccountList;
    static Company = CompanyList;
    static Report = ReportList;
    static Income = IncomeList;
    static Spending = SpendingList;
}

export const Account = AccountList;
export const Company = CompanyList;
export const Report = ReportList;
export const Income = IncomeList;
export const Spending = SpendingList;