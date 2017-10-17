import _ from 'lodash';

export function getItems(state) {
    return state.messages.itemsById;
}

export function getItemById(state, id) {
    return state.messages.itemsById['_' + id];
}

function setCurrentItemId(state, payload) {
    return state.merge({
        currentItemId: payload._id
    })
}
export function getCurrentItem(state) {
    return state.messages.currentItemId ? getItemById(state, state.messages.currentItemId) : null;
}
