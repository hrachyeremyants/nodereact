import { browserHistory } from 'react-router';
import api from '../../services/api';
import _ from 'lodash';

export const types = {
    FETCH_ALL_ITEMS_DONE: 'messages.FETCH_ALL_ITEMS_DONE',
    FETCH_ITEM_DONE: 'messages.FETCH_ITEM_DONE',
    SET_CURRENT_ITEM_ID: 'messages.SET_CURRENT_ITEM_ID',

};

export function setCurrentItemId(id) {
    return {
        type: types.SET_CURRENT_ITEM_ID,
        payload: {
            id
        }
    }
}

export function unsetCurrentItemId() {
    return {
        type: types.SET_CURRENT_ITEM_ID,
        payload: {
            id: null,
        }
    }
}

export function fetchAllItems() {
    return async (dispatch, getState) => {
        try {
            let params = new Map();
            let items = await api.get('/chat', params);

            dispatch({
                type: types.FETCH_ALL_ITEMS_DONE,
                payload: {
                    items
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export function fetchItem(id) {
    return async (dispatch) => {
        try {

            let params = new Map();

            // GET request from API
            let item = await api.get(`/chat/${id}`, params);
            dispatch({
                type: types.FETCH_ITEM_DONE,
                payload: {
                    item
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
}