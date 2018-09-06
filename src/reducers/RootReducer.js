import actions from '../actions/Actions';
import _ from 'lodash';

/**
 * Root reducer. Used to apply actions of all reducers to application state
 */

/**
 * Global application state
 */
const initialState = {
    isLogin: false,
    updateCounter: 0,
    list: {},
    item: {},
    errors: {},
    itemSaveSuccessText: "",
    isUpdating: false,
    sortOrder: {},
    listFilter: {},
    pageNumber: {"company":1},
    selectedItems: {},
    itemsPerPage: {"company":10},
    numberOfItems: {"company":16},
    companies_list: []
};

/**
 * Root reducer function
 * @param state: Current state before change
 * @param action: Action, which should be applied to state
 * @returns new state after apply action
 */
export default function rootReducer(state=initialState,action) {
    let newState = _.cloneDeep(state);
    switch (action.type) {
        case actions.types.CHANGE_PROPERTY:
            newState[action.name] = _.cloneDeep(action.value);
            break;
        case actions.types.CHANGE_PROPERTIES:
            for (let name in action.properties) {
                if (!action.properties.hasOwnProperty(name)) continue;
                newState[name] = _.cloneDeep(action.properties[name]);
            }
            break;
        default:
            break;
    }
    return newState;
}