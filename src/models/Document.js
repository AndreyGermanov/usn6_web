import Entity from './Entity';
import moment from "moment-timezone";
import t from '../utils/translate/translate';

/**
 * Base database model for documents
 */
class Document extends Entity {
    constructor() {
        super();
        this.itemName = "document";
        this.collectionName = "documents";
        this.itemTitle = "Документ";
        this.collectionTitle = "Документы";
    }

    /**
     * Method returns title of item in Detail View form
     * @param item - Item to get title form
     * @returns {string} Generated title
     */
    getItemTitle(item) {
        return this.itemTitle + ' № ' + item['number'] + ' ' +
            (item["date"] ?
                    t("от")+" "+moment(parseInt(item["date"])*1000).format("DD.MM.YYYY HH:mm:ss") :
                    ""
            )
    }

    /********************************************************
     * Functions used to convert field value from a form    *
     * which it has in input to the form which accepted by  *
     * application state                                    *
     ********************************************************/
    parseItemField_date(date) {
        if (typeof(moment(date).unix) === "function") {
            return moment(date).unix()
        }
        return 0;
    }

    /**
     * Methods used to render presentations of field values
     * in list view
     * @param value: Source value
     * @returns formatted value
     */
    getStringOfField_date(value) {
        if (this.cleanIntField(value)) {
            return moment(value*1000).format("DD.MM.YYYY HH:mm:ss");
        } else {
            return 0;
        }
    }

    getStringOfField_amount(value) {
        const result = this.cleanDecimalField(value);
        if (result!==null) {
            return result.toFixed(2);
        }
        return 0;
    }
}

export default Document;