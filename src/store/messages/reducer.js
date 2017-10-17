import Immutable from 'seamless-immutable';
import { types } from './actions';
import moment from 'moment';
import _ from 'lodash';

const initialState = Immutable({
    currentItemId: null,
    itemsById: {
        // _id: {item_details}
    }
});
function fetchItemDone(state, payload) {
    let newState = {
        itemsById: {}
    };
    newState['itemsById']['_' + payload.item._id] = payload.item;
    return state.merge(newState, {deep: true})
}
function setCurrentItemId(state, payload) {
    return state.merge({
        currentItemId: payload.id
    })
}
function fetchAllItemsDone(state, payload) {
    return state.merge({
        itemsById: _.keyBy(payload.items, (item) => '_'+item._id)
    })

}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_ITEM_DONE:

            return fetchItemDone(state, action.payload);
        case types.FETCH_ALL_ITEMS_DONE:

            return fetchAllItemsDone(state, action.payload);
        case types.SET_CURRENT_ITEM_ID:

            return setCurrentItemId(state, action.payload);
        default:

            return state;
    }
}